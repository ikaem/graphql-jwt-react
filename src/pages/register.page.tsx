import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";

import Layout from "../components/layout.component";

interface RegisteredUserInterface {
  register: {
    __typename: string;
    first_name: string;
    avatar_link: string;
    access_token: string;
    isLoggedIn?: boolean;
  };
}

const REGISTER_MUTATION_QUERY = gql`
  mutation Register(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
  ) {
    register(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
    ) {
      first_name
      avatar_link
      access_token
    }
  }
`;

const RegisterPage = () => {
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  const [redirectToEdit, setRedirectToEdit] = useState<number>();

  const [registerMutation, { client, data }] = useMutation<
    RegisteredUserInterface
  >(REGISTER_MUTATION_QUERY, {
    onCompleted: ({ register: { access_token } }) => {
      console.log("token on completed", access_token);

      const tokenDataString = access_token.split(".")[1];
      const jsonedData = atob(tokenDataString);
      const { userId } = JSON.parse(jsonedData) as { userId: number };

      setRedirectToEdit(userId);
    },
    onError: (error) => {
      console.log(error);
      console.log(Object.keys(error));
      console.log(error.networkError);
      console.log(error.message);
      console.log(error.extraInfo);
      console.log(error.graphQLErrors);
    },
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredFirstName = (firstNameInput.current as HTMLInputElement).value;
    const enteredLastName = (lastNameInput.current as HTMLInputElement).value;
    const enteredEmail = (emailInput.current as HTMLInputElement).value;
    const enteredPassword = (passwordInput.current as HTMLInputElement).value;
    const enteredConfirmPassword = (confirmPasswordInput.current as HTMLInputElement)
      .value;

    if (
      !enteredFirstName ||
      !enteredLastName ||
      !enteredEmail ||
      !enteredPassword ||
      !enteredConfirmPassword
    )
      return;

    if (enteredPassword !== enteredConfirmPassword) {
      (confirmPasswordInput.current as HTMLInputElement).value = "";
      return (confirmPasswordInput.current as HTMLInputElement).setAttribute(
        "placeholder",
        "Passwords do not match"
      );
    }

    console.log(`
            ${enteredFirstName}
            ${enteredLastName}
            ${enteredEmail}
            ${enteredPassword}
        `);

    registerMutation({
      variables: {
        first_name: enteredFirstName,
        last_name: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
      },
      update: (cache, { data }) => {
        client?.writeQuery({
          query: gql`
            query Login {
              login {
                __typename
                first_name
                avatar_link
                access_token
                isLoggedIn
                # refreshRequestHasFinished
              }
            }
          `,
          data: {
            login: {
              __typename: data?.register.__typename,
              first_name: data?.register.first_name,
              avatar_link: data?.register.avatar_link,
              access_token: data?.register.access_token,
              isLoggedIn: true,
              // refreshRequestHasFinished: true,
            },
          },
        });
      },
    });
  };

  return (
    <Layout>
      <RegisterStyled>
        <section className="main-content__register-section">
          <h1 className="register-section__title">Register</h1>
          <form
            className="register-section__register-form"
            onSubmit={handleRegister}
          >
            <label htmlFor="firstName" className="register-form__label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="register-form__input"
              ref={firstNameInput}
              required
            />
            <label htmlFor="lastName" className="register-form__label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="register-form__input"
              required
              ref={lastNameInput}
            />
            <label htmlFor="email" className="register-form__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="register-form__input"
              required
              ref={emailInput}
            />
            <label htmlFor="password" className="register-form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="register-form__input"
              required
              ref={passwordInput}
            />
            <label htmlFor="confirmPassword" className="register-form__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="register-form__input"
              required
              ref={confirmPasswordInput}
            />
            <button type="submit" className="register-form__register-button">
              Register
            </button>
          </form>
        </section>
      </RegisterStyled>
      {redirectToEdit && <Redirect to={`/editprofile/${redirectToEdit}`} />}
    </Layout>
  );
};

const RegisterStyled = styled.main`
  .main-content__register-section {
    width: 100%;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
  }

  .register-section__title {
    color: #b5b5b5;
    font-size: 1.1rem;
    text-transform: uppercase;
    font-weight: 300;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #b8b8b8;
  }

  .register-section__register-form {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }

  .register-form__label {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .register-form__register-button {
    margin-top: 2rem;
    background-color: #4d4d4d;
    color: white;
  }
`;

export default RegisterPage;
