import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/home.page";
import ProfilePage from "./pages/profile.page";
import RegisterPage from "./pages/register.page";
import LoginPage from "./pages/login.page";
import AddEditProfilePage from "./pages/add-edit-profile.page";
import EditProfilePage from "./pages/edit-profile.page";
import ProtectedRoute from "./containers/protected-route.container";

//
import { useState, useEffect } from "react";
import { useQuery, useMutation, gql, useApolloClient } from "@apollo/client";

const TEST_LOGIN_CACHE = gql`
  query {
    login @client {
      __typename
      first_name
      avatar_link
      access_token
      isLoggedIn
      # refreshRequestHasFinished
    }
  }
`;

const REFRESH_ACCESS_TOKEN = gql`
  mutation RefreshAccessToken {
    refreshAccessToken {
      first_name
      avatar_link
      access_token
    }
  }
`;

const GET_IS_LOGGED_IN_AT_CLIENT = gql`
  query GetIsLoggedInAtClient {
    login @client {
      access_token
      isLoggedIn
    }
  }
`;

const GET_PAGINATED_COUNTRIES_QUERY = gql`
  query GetPaginatedCountries($cursor: Int) {
    getPaginatedCountries(cursor: $cursor) {
      countries {
        country_id
        country_name
      }
      cursor
      hasNextPage
      totalCountries
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
  };
}

const GET_COUNTRIES_QUERY = gql`
  query GetCountries {
    getCountries {
      country_id
      country_name
    }
  }
`;

const GET_SPECIFIC_COUNTRY_QUERY = gql`
  query GetCountry($id: Int!) {
    getCountry(id: $id) {
      country_id
      country_name
    }
  }
`;

const ADD_COUNTRY_MUTATION_QUERY = gql`
  mutation AddCountry($country_name: String!) {
    addCountry(country_name: $country_name) {
      country_id
      country_name
    }
  }
`;

const App = () => {
  // const myClient = useApolloClient();

  // const queryLoginData = myClient.readQuery<{
  //   login: {
  //     __typename: string;
  //     first_name: string;
  //     avatar_link: string;
  //     access_token: string;
  //     isLoggedIn: boolean;
  //   };
  // }>({
  //   query: TEST_LOGIN_CACHE,
  // });

  // const { login } = queryLoginData!;

  // // console.log(login);

  // const { data: testLoginData } = useQuery<{
  //   login: {
  //     __typename: string;
  //     first_name: string;
  //     avatar_link: string;
  //     access_token: string;
  //     isLoggedIn: boolean;
  //   };
  // }>(TEST_LOGIN_CACHE);

  // const { login: testLogin } = testLoginData!

  // console.log(testLogin);

  const [counter, setCounter] = useState(0);

  // console.log(counter);

  const {
    data: {
      login: { access_token, isLoggedIn },
    },
  } = useQuery(GET_IS_LOGGED_IN_AT_CLIENT) as {
    data: { login: { access_token: string; isLoggedIn: boolean } };
  };

  const [refreshLogin, { client }] = useMutation<{
    refreshAccessToken: {
      first_name: string;
      avatar_link: string;
      access_token: string;
      __typename: string;
    };
  }>(REFRESH_ACCESS_TOKEN, {
    onError: (error) => {
      console.log(error);
      console.log(error.graphQLErrors);
      client?.writeQuery({
        query: gql`
          query Login {
            login {
              __typename
              first_name
              avatar_link
              access_token
              isLoggedIn
              refreshRequestHasFinished
            }
          }
        `,
        data: {
          login: {
            __typename: "",
            first_name: "",
            avatar_link: "",
            access_token: "",
            isLoggedIn: false,
            refreshRequestHasFinished: true,
          },
        },
      })
    },
    update: (cache, { data }) => {
      console.log("update data when no mutation:", data)
      client?.writeQuery({
        query: gql`
          query Login {
            login {
              __typename
              first_name
              avatar_link
              access_token
              isLoggedIn
              refreshRequestHasFinished
            }
          }
        `,
        data: {
          login: {
            __typename: data?.refreshAccessToken.__typename,
            first_name: data?.refreshAccessToken.first_name,
            avatar_link: data?.refreshAccessToken.avatar_link,
            access_token: data?.refreshAccessToken.access_token,
            isLoggedIn: true,
            refreshRequestHasFinished: true,
          },
        },
      });
    },
  });

  useEffect(() => {
    refreshLogin();
  }, []);

  useEffect(() => {
    if (!access_token) return;

    console.log(
      "inside silent refresh use effect - access token:",
      access_token
    );

    const dataString = access_token.split(".")[1];
    const jsonedData = atob(dataString);
    const { iat, exp } = JSON.parse(jsonedData) as { iat: number; exp: number };

    const timeoutId = setTimeout(() => {
      refreshLogin();
      }, (exp - iat - 60) * 1000);
    // }, 10000);

    // console.log(timeoutId);

    // if (!isLoggedIn) clearTimeout(timeoutId);
  }, [access_token]);

  return (
    <Switch>
      <Route exact path="/">
        {/* <Redirect to="/home" /> */}
{/* 
        <p>__typename: {login.__typename}</p>
        <p>first_name: {login.first_name}</p>
        <p>avatar_link: {login.avatar_link}</p>
        <p>access_token: {login.access_token}</p>
        <p>isLoggedIn: {login.isLoggedIn.toString()}</p> */}

        {/* <div>
          <button onClick={() => addCountryMutation()}>
            Add Country
          </button>
        </div> */}
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
        <ProtectedRoute>
          <AddEditProfilePage />
        </ProtectedRoute>
      </Route>
    </Switch>
  );
};

export default App;
