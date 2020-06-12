import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";


const Footer = () => {
    return (
    <FooterStyled className="main-footer">
        <div className="main-footer__logo-container">
            <Link className="logo-container__logo-link" to="/home">
                <h3 className="logo-container__logo-actual">
                GraphQL-JWT
                </h3>
            </Link>      
        </div>
    </FooterStyled>
    )
}

const FooterStyled = styled.footer`
  background-color: #C4C4C4;
  display: flex;
  justify-content: start;
  align-items: center;

  .logo-container__logo-actual {
    font-size: 1rem;
    color: white;
    text-transform: uppercase;
  }
`;

export default Footer
