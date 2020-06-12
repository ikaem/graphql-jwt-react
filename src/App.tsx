import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";


import HomePage from './pages/home.page';
import ProfilePage from './pages/profile.page';
import RegisterPage from './pages/register.page';
import LoginPage from './pages/login.page';
import AddEditProfilePage from './pages/add-edit-profile.page';
import EditProfilePage from './pages/edit-profile.page';

//
import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_PAGINATED_COUNTRIES_QUERY = gql`
  query GetPaginatedCountries($cursor: Int) {
    getPaginatedCountries(cursor: $cursor) {
      countries {country_id, country_name},
      cursor,
      hasNextPage,
      totalCountries,
      countriesPerPage
    }
  }
`;

interface ReturnedData {
  getPaginatedCountries: {
      countries: {
         country_id: string;
         country_name: string; 
      }[];
      countriesPerPage: number;
      cursor: number;
      hasNextPage: boolean;
      totalCountries: number;
  }
}

const App = () => {

  // const [ paginationCursor, setPaginationCursor ] = useState<number>(0);
  // const [ hasNextPage, setHasNextPage ] = useState<Boolean>(false);

  // const { data, loading, error, fetchMore } = useQuery(GET_PAGINATED_COUNTRIES_QUERY, {
  //   variables: {
  //     cursor: 0,
  //   },
  //   onCompleted: ({ getPaginatedCountries: { cursor, countries }}) => {
  //     console.log(cursor)
  //   }
  // });



  // useEffect(() => {
  //   console.log("data here", data);
  // }, [data])


  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />


        {/* <h1>Hello</h1>

        { data?.getPaginatedCountries.countries.map(
          (country:  { country_name: string }) => {
          return <li>{country.country_name}</li>
        })}

        <button
          disabled={!data?.getPaginatedCountries.hasNextPage}
          onClick={() =>{ 
              console.log(data);
              fetchMore({
              variables: {
                cursor: data.getPaginatedCountries.cursor
              },
              updateQuery: (prevResult: any, newData: any) => {
                console.log("prevResult:",prevResult);
                console.log("fetchMoreResult:", newData);

                return {
                  getPaginatedCountries: {
                    cursor: newData?.fetchMoreResult.getPaginatedCountries.cursor,
                    countries: [...prevResult?.getPaginatedCountries.countries, ...newData?.fetchMoreResult.getPaginatedCountries.countries],
                    totalCountries: newData?.fetchMoreResult.getPaginatedCountries.totalCountries,
                    hasNextPage: newData?.fetchMoreResult.getPaginatedCountries.hasNextPage,
                    countriesPerPage: newData?.fetchMoreResult.getPaginatedCountries.countriesPerPage,
                    __typename: "PaginatedCountries",
                  }
                }
              }
            })
          }}>
            Fetch More countries...</button> */}



      </Route>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/profile/:user_id">
        <ProfilePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/editprofile/:user_id">
        <EditProfilePage />
      </Route>
      <Route path="/addprofile">
        <AddEditProfilePage />
      </Route>
    </Switch>
  );
}

export default App;