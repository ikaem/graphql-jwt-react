import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

interface UserBriefProps {
    avatar_link: string;
    city: string;
    first_name: string;
    last_name: string;
    user_id: string;
    website: string;
    country: {
        country_name: string;
    }
}

const UserBrief: React.FC<UserBriefProps> = ({ avatar_link, city, first_name, last_name, user_id, website, country }) => {
    return (
    <UserBriefStyled className="people-list__person-item">
        <div className="person-item__avatar-container">
            <img src={ avatar_link } alt=""/>
        </div>
        <Link className="person-item__link" to={`/profile/${user_id}`}>
            <span className="person-item__name">
                { first_name } { last_name }
            </span>
        </Link>
        <span className="person-item__country">
            { country.country_name }
        </span>
        <span className="person-item__city">
            { city }
        </span>
        <span className="person-item__website">
            <a href={ website }>{ website }</a>
        </span>
    </UserBriefStyled>
    )
}

const UserBriefStyled = styled.li`

    padding: 1rem 0;
    border-bottom: 1px solid #B8B8B8;

    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 0.25rem 1rem;

    > span, .person-item__link {
        grid-column: 2;
        font-size: 1.1rem;
    }

    .person-item__avatar-container {
        grid-row: span 4;
        width: 3rem;

        > img {
            width: 100%;
            display: block;
            border-radius: 50%;
        }
    }

    .person-item__name,
    .person-item__country,
    .person-item__city {
        text-transform: capitalize;
    }
`;

export default UserBrief;
