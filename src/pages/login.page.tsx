import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  useMutation,
  gql,
  ApolloCache,
  MutationUpdaterFn,
} from "@apollo/client";
import { Redirect } from "react-router-dom";

import Layout from "../components/layout.component";

interface LoggedUserInterface {
  login: {
    __typename: string;
    first_name: string;
    avatar_link: string;
    access_token: string;
    isLoggedIn?: boolean;
  };
}

const LOGIN_MUTATION_QUERY = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      first_name
      avatar_link
      access_token
    }
  }
`;

const LOGIN_MUTATION_QUERY_AT_CLIENT = gql`
  mutation LoginAtClient(
    $__typename: string
    $first_name: string
    $avatar_link: string
    $access_token: string
  ) {
    loginUser(
      __typename: $__typename
      first_name: $first_name
      avatar_link: $avatar_link
      access_token: $access_token
    ) @client
  }
`;

const LoginPage = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);


  const [redirectRoute, setRedirectRoute] = useState<string>("home");
  const [doRedirect, setDoRedirect] = useState<boolean>(false);

  const [loginMutation, { client }] = useMutation<LoggedUserInterface>(
    LOGIN_MUTATION_QUERY,
    {
      onCompleted: (data) => {
        setDoRedirect(true);
      },
      onError: (error) => {
        console.log(error);
        console.log(error.graphQLErrors);
      },

      update: (_cache, { data }) => {
        client?.writeQuery({
          // cache.writeQuery({
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
              __typename: data?.login.__typename,
              first_name: data?.login.first_name,
              avatar_link: data?.login.avatar_link,
              access_token: data?.login.access_token,
              isLoggedIn: true,
              refreshRequestHasFinished: true,
            },
          },
        });
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredEmail = (emailInputRef.current as HTMLInputElement).value;
    // const enteredEmail = emailInputRef.current?.value;
    // const enteredEmail = emailInputRef.current.value; // error, warning that the current property is possibly null

    const enteredPassword = (passwordInputRef.current as HTMLInputElement)
      .value;

    if (!enteredEmail || !enteredPassword) return;

    loginMutation({
      variables: {
        email: enteredEmail,
        password: enteredPassword,
      },
    });

    // console.log("input email ref", emailInputRef.current!.value);
  };

  return (
    <Layout>
      <LoginStyled>
        <section className="main-content__login-section">
          <h1 className="login-section__title">Login</h1>
          <form className="login-section__login-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="login-form__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="login-form__input"
              ref={emailInputRef}
              required
            />
            <label htmlFor="password" className="login-form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="login-form__input"
              ref={passwordInputRef}
              required
            />
            <button type="submit" className="login-form__login-button">
              Login
            </button>
          </form>
        </section>
        {doRedirect && <Redirect to={`/${redirectRoute}`} />}
      </LoginStyled>
    </Layout>
  );
};

const LoginStyled = styled.main`
  .main-content__login-section {
    width: 100%;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
  }

  .login-section__title {
    color: #b5b5b5;
    font-size: 1.1rem;
    text-transform: uppercase;
    font-weight: 300;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #b8b8b8;
  }

  .login-section__login-form {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }

  .login-form__label {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .login-form__login-button {
    margin-top: 2rem;
    background-color: #4d4d4d;
    color: white;
  }
`;

export default LoginPage;
