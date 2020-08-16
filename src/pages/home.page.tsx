import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

import Layout from "../components/layout.component";
import UsersBriefMapper from "../containers/users-brief-mapper.container";
import SectionTitle from "../elements/section-title.element";
import PagesControl from "../components/pages-control.component";

const PAGINATED_USERS_QUERY = gql`
  query GetPaginatedUsers($cursor: Int) {
    getPaginatedUsers(cursor: $cursor) {
      users {
        user_id
        avatar_link
        first_name
        last_name
        country {
          country_name
        }
        city
        website
      }
      cursor
      hasNextPage
      totalUsers
      usersPerPage
    }
  }
`;

const HomePage = () => {
  const [ getPaginatedUsers, {
    data: paginatedUsersData,
    loading: paginatedUsersLoading,
    error: paginatedUsersError,
    fetchMore: paginatedUsersFetchMore,
    called: paginatedUsersCalled,
  }] = useLazyQuery(PAGINATED_USERS_QUERY, {
    variables: {
      cursor: 0,
    },
  });

  useEffect(() => {
    getPaginatedUsers();
  }, []);

  // const { data: paginatedUsersData, loading: paginatedUsersLoading, error: paginatedUsersError, fetchMore: paginatedUsersFetchMore } = useQuery(PAGINATED_USERS_QUERY, {
  //     variables: {
  //         cursor: 0,
  //     }
  // });

  const handlePaginatedUsersFetchMore = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {

    if(!paginatedUsersFetchMore) return;

    paginatedUsersFetchMore({
      variables: {
        cursor: paginatedUsersData.getPaginatedUsers.cursor,
      },
      updateQuery: (prevResult: any, newData: any) => {
        const newCursor = newData?.fetchMoreResult.getPaginatedUsers.cursor;
        const newUsers = newData?.fetchMoreResult.getPaginatedUsers.users;
        const oldUsers = prevResult.getPaginatedUsers.users;
        const newTotalUsers =
          newData?.fetchMoreResult.getPaginatedUsers.totalUsers;
        const newHasNextPage =
          newData?.fetchMoreResult.getPaginatedUsers.hasNextPage;
        const newUsersPerPage =
          newData?.fetchMoreResult.getPaginatedUsers.usersPerPage;

        return {
          getPaginatedUsers: {
            cursor: newCursor,
            users: [...oldUsers, ...newUsers],
            totalUsers: newTotalUsers,
            hasNextPage: newHasNextPage,
            usersPerPage: newUsersPerPage,
            __typename: "PaginatedUsers",
          },
        };
      },
    });
  };

  return (
    <Layout>
      <HomePageStyled>
        <section className="main-content__people-section">
          <div className="people-section__title-wrapper">
            <SectionTitle title="People on the network" />
          </div>

          <div className="people-section__users-brief-mapper-wrapper">
            {paginatedUsersError && (
              <p>
                Unfortunately, there was an error fetching users. Please try
                again later.{" "}
              </p>
            )}
            {paginatedUsersLoading && <p>Loading...</p>}

            {paginatedUsersData && (
              <UsersBriefMapper
                users={paginatedUsersData.getPaginatedUsers.users}
              />
            )}
          </div>

          <div className="people-section__pages-control-wrapper">
            <PagesControl
              handlePagination={handlePaginatedUsersFetchMore}
              hasNextPage={paginatedUsersData?.getPaginatedUsers.hasNextPage}
            />
          </div>
        </section>
      </HomePageStyled>
    </Layout>
  );
};

const HomePageStyled = styled.main`
  .main-content__people-section {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
  }
  .people-section__pages-control-wrapper {
    align-self: flex-end;
  }
`;

export default HomePage;
