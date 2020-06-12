import React from 'react'
import styled from "styled-components";

interface PagesControlPropsInterface {
    handlePagination: (e: React.MouseEvent<HTMLButtonElement>) => void;
    hasNextPage: boolean;
}

const PagesControl = ({ handlePagination, hasNextPage }: PagesControlPropsInterface ) => {
    return (
    <PagesControlStyled className="people-section__pages-control">
        <button className="pages-control__previous-page">
        <span>{"<"}</span>
        <span> Previous Page</span>
        </button>
        <button 
            disabled={!hasNextPage}
            onClick={handlePagination}
            className="pages-control__next-page">
        <span>Next Page </span>
        <span>{">"}</span>
        </button>
    </PagesControlStyled>
    )
}

const PagesControlStyled = styled.div`

    button {
        padding: 0;
        margin: 0;
        text-transform: uppercase;
        color: #999999;
    }

    button:first-child {
        margin-right: 2rem;
    }

`;

export default PagesControl;