import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";

import { gql, useMutation, useApolloClient, useQuery, useLazyQuery, QueryTuple, QueryLazyOptions } from "@apollo/client";

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout
  }
`;

const GET_LOGGED_USER_AT_CLIENT = gql`
  query GetLoggedUserAtClient {
    # getLoggedUser @client {
    login @client {
      first_name
      avatar_link
    }
  }
`;

const Header = () => {
  const [ counter, setCounter ] = useState<number>(0);
  // const client = useApolloClient();

  // console.log("counter:", counter);

  const [logoutRedirect, setLogoutRedirect] = useState<string>("");

  // const [ getLoggeduserAtClient, { data }] = useLazyQuery<{ login: { first_name: string, avatar_link: string } }>(GET_LOGGED_USER_AT_CLIENT);
  const [ getLoggeduserAtClient, { data }] = useLazyQuery<{ login: { first_name: string, avatar_link: string }}>(GET_LOGGED_USER_AT_CLIENT);
  // const [ getLoggeduserAtClient, { data }] = useLazyQuery<{ login: { first_name: string, avatar_link: string }}>(GET_LOGGED_USER_AT_CLIENT) as [()];

  const { first_name, avatar_link } = data?.login || { first_name: "", avatar_link: ""};

  useEffect(() => {
    getLoggeduserAtClient();
  }, []);

  // const {
  //   data: {
  //     login: { first_name, avatar_link },
  //   },
  // } = useQuery(GET_LOGGED_USER_AT_CLIENT) as {
  //   data: { login: { first_name: string; avatar_link: string } };
  // };

  // const { login: { first_name, avatar_link }} = client.readQuery({
  //   query: GET_LOGGED_USER_AT_CLIENT
  // }) as { login: { first_name: string; avatar_link: string } };

  const [logoutMutationAtServer, { client }] = useMutation<{ logout: boolean }>(
    LOGOUT_USER,
    {
      onCompleted: ({ logout }) => {
        if (!logout) throw new Error("There was an error logging out the user");
        setLogoutRedirect("login");

        client?.resetStore();
      },
      onError: (error) => {
        console.log(error);
        console.log(error.graphQLErrors);
      },
    }
  );

  // const handleLogout = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
  //   client.resetStore();
  //   setLogoutRedirect("login")
  // };

  // console.log("user cache query", isLoggedIn);
  return (
    <HeaderStyled>
      <div className="main-header__logo-container">
        <Link className="logo-container__logo-link" to="/home">
          <h1 className="logo-container__logo-actual">GraphQL-JWT</h1>
        </Link>
      </div>
      <nav className="main-header__navigation">
        <ul className="navigation__options">
          <li className="navigation__option first-option">
            <Link className="option__link-actual" to="/profile">
              <div className="link-actual__avatar-container">
                <img src={avatar_link} alt="" />
              </div>
              {first_name && (
                <span className="link-actual__text">
                  Hi, &nbsp; <strong>{first_name}</strong>
                </span>
              )}
            </Link>
          </li>
          <li className="navigation__option">
            <span
              // onClick={handleLogout}
              onClick={() => logoutMutationAtServer()}
              className="option__link-actual"
              style={{ cursor: "pointer" }}
            >
              Logout
            </span>
          </li>
          <li className="navigation__option">
            <Link className="option__link-actual" to="/login">
              <span className="link-actual__text">Login</span>
            </Link>
          </li>
          <li className="navigation__option">
            <Link className="option__link-actual" to="/register">
              <span className="link-actual__text">Register</span>
            </Link>
          </li>

          <li className="navigation__option">
            <Link className="option__link-actual" to="/addprofile">
              <span className="link-actual__text">Add profile</span>
            </Link>
          </li>
        </ul>
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            setCounter(prev => prev + 1);
          }}
        >Click</button> */}
      </nav>
      {logoutRedirect && <Redirect to={`/${logoutRedirect}`} />}
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  background-color: #c4c4c4;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .main-header__logo-container {
    display: flex;
    align-items: center;
    > a {
      display: flex;
      align-items: center;
      > h1 {
        display: flex;
        align-items: center;
      }
    }
  }
  .main-header__navigation {
    display: flex;
    align-items: center;
    > ul {
      display: flex;
      align-items: center;
      > li {
        display: flex;
        align-items: center;
        > a {
          display: flex;
          align-items: center;
          > div {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  .logo-container__logo-actual {
    font-size: 1.1rem;
    color: #404040;
    text-transform: uppercase;
  }

  .navigation__option:not(.first-option) {
    margin-left: 1rem;
  }

  .option__link-actual {
    color: #404040;
    font-size: 0.9rem;
  }

  .link-actual__avatar-container {
    width: 2rem;
    margin-right: 0.5rem;

    > img {
      width: 100%;
      border-radius: 50%;
      display: block;
    }
  }
`;

export default Header;
