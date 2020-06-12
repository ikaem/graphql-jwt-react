import React from 'react'
import styled from "styled-components";

const SectionTitle = ({ title }: { title: string }) => {
    return (
        <SectionTitleStyled className="people-section__title">
            { title }
        </SectionTitleStyled>
    )
}

const SectionTitleStyled = styled.h1`
    color: #B5B5B5;
    font-size: 1.1rem;
    text-transform: uppercase;
    font-weight: 300;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #B8B8B8;
`;

export default SectionTitle
