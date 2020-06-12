import React from 'react'
import styled from "styled-components";

import Layout from "../components/layout.component";

const RegisterPage = () => {
    return (
    <Layout>
        <RegisterStyled>
            <section className="main-content__register-section">
                <h1 className="register-section__title">Register</h1>
                <form className="register-section__register-form">
                    <label htmlFor="firstName" className="register-form__label">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="register-form__input"/>
                    <label htmlFor="lastName" className="register-form__label">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="register-form__input"/>
                    <label htmlFor="email" className="register-form__label">Email</label>
                    <input type="email" id="email" name="email" className="register-form__input"/>
                    <label htmlFor="password" className="register-form__label">Password</label>
                    <input type="password" id="password" name="password" className="register-form__input"/>
                    <label htmlFor="confirmPassword" className="register-form__label">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" className="register-form__input"/>
                    <button type="submit" className="register-form__register-button">Register</button>
                </form>
            </section>
        </RegisterStyled>
    </Layout>
    )
}

const RegisterStyled = styled.main`
    .main-content__register-section {
        width: 100%;
        margin: 1rem auto;
        display: flex;
        flex-direction: column;
    }

    .register-section__title {
        color: #B5B5B5;
        font-size: 1.1rem;
        text-transform: uppercase;
        font-weight: 300;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #B8B8B8;
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
        background-color: #4D4D4D;
        color: white;
    }
`;

export default RegisterPage;
