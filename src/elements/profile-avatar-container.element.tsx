import React from 'react';
import styled from "styled-components";

const ProfileAvatarContainer = ({ avatarUrl }: { avatarUrl: string }) => {
    return (
    <ProfileAvatarContainerStyled>
        <img src="https://source.unsplash.com/225x225/?portrait" alt=""/>
    </ProfileAvatarContainerStyled>
    );
}

const ProfileAvatarContainerStyled = styled.div`
    width: 10rem;

    img {
        width: 100%;
        border-radius: 50%;
        display: block;
    }
`;



export default ProfileAvatarContainer
