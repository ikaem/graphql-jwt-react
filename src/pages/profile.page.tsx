import React, { useState } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams, Redirect } from "react-router-dom";

import Layout from "../components/layout.component";
import SectionTitle from '../elements/section-title.element';
import UserProfileDetailed from "../components/user-profile-detailed.component";
// import ProfileAvatarContainer from "../elements/profile-avatar-container.element";

const USER_DETAILED_QUERY = gql`
  query GetUserDetailed($user_id: Int!) {

    getUser(id: $user_id) {
        user_id,
        email,
        first_name,
        last_name,
        city,
        website,
        age,
        hobbies,
        # country,
        country { country_name },
        avatar_link
    }
  }
`;

const USER_DELETE_MUTATION_QUERY = gql`
    mutation DeleteUser ($user_id: Int) {
        deleteUser(user_id: $user_id) 
    }
`;

const ProfilePage = () => {

    const { user_id } = useParams();
    const [ isProfileDeleted, setIsProfileDeleted ] = useState<Boolean> (false);


    const { data: userData, loading: userLoading, error: userError } = useQuery(USER_DETAILED_QUERY
        , {
        variables: {
          user_id: +user_id,
        }
      }
    );

    const [ deleteUser ] = useMutation(USER_DELETE_MUTATION_QUERY, {
        variables: {
            user_id: +user_id,
        }, 
        onCompleted: () => {
            setIsProfileDeleted(true);
        }
    })

    return (
    <Layout>
        <ProfileStyled>
            <section className="main-content__profile-section">
                <div 
                    className="people-section__title-wrapper">
                    <SectionTitle title="Profile" />
                </div>

                <div 
                    className="people-section__profile-detailed-wrapper">

                    {userError && <p>Unfortunately, there was an error fetching user. Please try again later. </p>}
                    {userLoading && <p>Loading...</p>}

                    {userData && <UserProfileDetailed 
                        {...userData.getUser}
                        deleteUser={deleteUser}
                    />}
                </div>
            </section>
        </ProfileStyled>
        {isProfileDeleted && <Redirect to="/home" />}
    </Layout>
    )
}

const ProfileStyled = styled.main`
    .main-content__profile-section {
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
        /* gap: 1rem; */

    }

`;

export default ProfilePage;







                {/* <div 
                    className="people-section__avatar-container-wrapper">
                        <ProfileAvatarContainer avatarUrl="https://source.unsplash.com/225x225/?portrait" />
                </div> */}

                {/* <div className="profile-section__avatar-container">
                    <img src="https://source.unsplash.com/225x225/?portrait" alt=""/>
                </div>
                <div className="profile-section__basic-info">
                    <h2 className="basic-info__name">Karlo Marinović</h2>
                    <h3 className="basic-info__email">karlo@karlo.com</h3>
                    <Link className="basic-info__edit-profile" to="/editprofile">Update my profile</Link>
                </div>
                <div className="profile-section__details-info">
                    <span className="details-info__key">Country:</span>
                    <span className="details-info__value">{"Croatia"}</span>
                    <span className="details-info__key">City:</span>
                    <span className="details-info__value">{"Pula"}</span>
                    <span className="details-info__key">Website:</span>
                    <span className="details-info__value">
                        <a href={"http://www.angrychairchronicles.com"}>{"angrychairchronicles.com"}</a>
                    </span>
                </div>
                <div className="profile-section__additional-info">
                    <span className="additional-info__key">Age:</span>
                    <span className="additional-info__value">{35}</span>
                    <span className="additional-info__key">Hobbies:</span>
                    <ul>
                        <li className="additional-info__value">{"Football"}</li>
                        <li className="additional-info__value">{"Reading"}</li>
                        <li className="additional-info__value">{"Chess"}</li>
                    </ul>
                </div> */}


/*
const ProfileStyled = styled.main`
    .main-content__profile-section {
        margin: 1rem 0;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;

        > .people-section__title-wrapper {
            grid-column: span 2;
        }

        > .profile-section__basic-info {
            align-self: center;
        }

        > .profile-section__details-info,
        .profile-section__additional-info {
            grid-column: 1 / 3;
            display: grid;
            grid-template-columns: 20% 80%;
            gap: 0.5rem 1rem;
        }
    }

    .profile-section__title {
        color: #B5B5B5;
        font-size: 1.1rem;
        text-transform: uppercase;
        font-weight: 300;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #B8B8B8;
    }

    .profile-section__avatar-container {
        width: 10rem;

        > img {
            width: 100%;
            border-radius: 50%;
            display: block;
        }
    }

    .profile-section__basic-info {
        display: flex;
        flex-direction: column;
    }

    .basic-info__name {
        font-size: 1.1rem;
        color: #737373;
        margin-bottom: 0.25rem;
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

    .profile-section__details-info {
        padding-bottom: 1rem;
        border-bottom: 1px solid #B8B8B8;

        > span {
            color: #737373;
        }

        > .details-info__value {
            font-weight: 700;
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
*/