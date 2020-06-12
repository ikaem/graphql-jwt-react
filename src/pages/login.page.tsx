import React from 'react'
import styled from "styled-components";

import Layout from "../components/layout.component";

const LoginPage = () => {
    return (
    <Layout>
        <LoginStyled>
            <section className="main-content__login-section">
                <h1 className="login-section__title">Login</h1>
                <form className="login-section__login-form">
                    <label htmlFor="email" className="login-form__label">Email</label>
                    <input type="email" id="email" name="email" className="login-form__input"/>
                    <label htmlFor="password" className="login-form__label">Password</label>
                    <input type="password" id="password" name="password" className="login-form__input"/>
                    <button type="submit" className="login-form__login-button">Login</button>
                </form>
            </section>
        </LoginStyled>
    </Layout>
    )
}

const LoginStyled = styled.main`
    .main-content__login-section {
        width: 100%;
        margin: 1rem auto;
        display: flex;
        flex-direction: column;
    }

    .login-section__title {
        color: #B5B5B5;
        font-size: 1.1rem;
        text-transform: uppercase;
        font-weight: 300;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #B8B8B8;
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
        background-color: #4D4D4D;
        color: white;
    }
`;

export default LoginPage;
