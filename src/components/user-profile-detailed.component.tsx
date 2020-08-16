import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";


interface UserProfileDetailedProps {

    user: {
        age: number;
        avatar_link: string;
        city: string;
        country: {
            country_name: string;
        };
        email: string;
        first_name: string;
        last_name: string;
        hobbies: string[];
        user_id: string;
        website: string;
    };
    deleteUser: any;
}

const UserProfileDetailed = ({ user, deleteUser }: UserProfileDetailedProps) => {

    const { age, avatar_link, city, country, email, first_name, last_name, hobbies, user_id, website } = user;

    return (
    <UserProfileDetailedStyled>
        <div className="profile-section__avatar-container">
            <img src={avatar_link} alt=""/>
        </div>

        <div className="profile-section__basic-info">
            <h2 className="basic-info__name">{first_name} {last_name}</h2>
            <h3 className="basic-info__email">{email}</h3>
            <Link className="basic-info__edit-profile" to={`/editprofile/${user_id}`}>Update my profile</Link>
            <p 
                onClick={deleteUser}
                className="basic-info__delete-profile">Delete profile
            </p>
        </div>

        <div className="profile-section__details-info">
            <span className="details-info__key">Country:</span>
            <span className="details-info__value country-value">{country.country_name}</span>
            <span className="details-info__key">City:</span>
            <span className="details-info__value city-value">{city}</span>
            <span className="details-info__key">Website:</span>
            <span className="details-info__value">
                <a href={website}>{website}</a>
            </span>
        </div>
        <div className="profile-section__additional-info">
            <span className="additional-info__key">Age:</span>
            <span className="additional-info__value">{age}</span>
            <span className="additional-info__key">Hobbies:</span>
            <ul>
                { hobbies?.map(hobby => {
                    return (
                        <li 
                            key={hobby}
                            className="additional-info__value">{hobby}</li>

                    );
                })}
            </ul>
        </div>
    </UserProfileDetailedStyled>
    )
}

const UserProfileDetailedStyled = styled.div`

    margin: 1rem 0;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;

    .profile-section__avatar-container {
        width: 10rem;

        img {
            width: 100%;
            border-radius: 50%;
            display: block;
        }
    }

    .profile-section__basic-info {
        align-self: center;
        display: flex;
        flex-direction: column;
    }

    .basic-info__name {
        font-size: 1.1rem;
        color: #737373;
        margin-bottom: 0.25rem;
        text-transform: capitalize;
    }
    .basic-info__email {
        font-size: 1rem;
        font-weight: 300;
        color: #A1A1A1;
        margin-bottom: 1rem;
    }
    .basic-info__edit-profile {
        text-transform: uppercase;
        font-size: 0.75rem;
        color: #ADADAD;
    }
    .basic-info__delete-profile {
        text-transform: uppercase;
        font-size: 0.75rem;
        color: red;
        cursor: pointer;

        :hover {
            color: orange;
        }

    }

    .profile-section__details-info,
    .profile-section__additional-info {
        grid-column: 1 / 3;
        display: grid;
        grid-template-columns: 20% 80%;
        gap: 0.5rem 1rem;
    }

    .profile-section__details-info {
        padding-bottom: 1rem;
        border-bottom: 1px solid #B8B8B8;

        > span {
            color: #737373;
        }

        > .details-info__value {
            font-weight: 700;
        }
        > .country-value, .city-value {
            text-transform: capitalize;
        }
    }

    .profile-section__additional-info {

        > span, ul {
            color: #A1A1A1;
        }

        .additional-info__value {
            font-weight: 700;
        }
    }
`;

export default UserProfileDetailed;