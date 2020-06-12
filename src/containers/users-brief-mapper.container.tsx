import React from 'react'
import styled from "styled-components";

import UserBrief from "../components/user-brief.component";

interface UsersBriefMapperProps {
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

// const UsersBriefMapper = ({ users }: { users: UsersBriefMappeProps[]}) => {
const UsersBriefMapper: React.FC<{users: UsersBriefMapperProps[]}> = ({ users }) => {
// const UsersBriefMapper = ({ users }: { users: UsersBriefMappeProps[]}) => {

    return (
    <UsersBriefMapperStyled>

        { users.map(user => {
            return (
                <UserBrief 
                    key={user.user_id}
                    {...user}
                />
            );
        })}

    </UsersBriefMapperStyled>
    )
}

const UsersBriefMapperStyled = styled.ul`

    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

`;

export default UsersBriefMapper;