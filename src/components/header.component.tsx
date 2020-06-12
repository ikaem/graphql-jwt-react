import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";


const Header = () => {
  return (
    <HeaderStyled>
      <div className="main-header__logo-container">
        <Link className="logo-container__logo-link" to="/home">
          <h1 className="logo-container__logo-actual">
            GraphQL-JWT
          </h1>
        </Link>                 
      </div>
      <nav className="main-header__navigation">
        <ul className="navigation__options">
          <li className="navigation__option first-option">
            <Link className="option__link-actual" to="/profile">
              <div className="link-actual__avatar-container">
                <img src="https://source.unsplash.com/225x225/?portrait" alt=""/>
              </div>
              <span className="link-actual__text">
                Hi, &nbsp; <strong>{"Karlo"}</strong>
              </span>
            </Link>
          </li>
          <li className="navigation__option">
            <Link className="option__link-actual" to="/home">
              Logout
            </Link>
          </li>
          <li className="navigation__option">
            <Link className="option__link-actual" to="/login">
              <span className="link-actual__text">
                Login
              </span>
            </Link>
          </li>
          <li className="navigation__option">
            <Link className="option__link-actual" to="/register">
              <span className="link-actual__text">
                Register
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  background-color: #C4C4C4;
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

export default Header
