import React, { useReducer, useState, useEffect } from 'react'
import styled from "styled-components";
import { useQuery, useMutation, gql, useLazyQuery } from "@apollo/client";
import { Redirect, useParams } from "react-router-dom";

import Layout from "../components/layout.component";
import SectionTitle from "../elements/section-title.element";
import AddEditProfileForm from "../components/add-edit-profile-form.component";

const GET_COUNTRIES_QUERY = gql`
    query GetCountries {
        getCountries {
            country_id,
            country_name
        }
    }
`;

const GET_USER_FOR_EDIT_QUERY = gql`
    query GetUserForEdit($user_id: Int!) {
        getUserForEdit(id: $user_id) {
            user {
                user_id,
                email,
                first_name,
                last_name,
                city,
                website,
                age,
                hobbies,
                # country,
                country { country_id },
                avatar_link
            },
            countries {
                country_id,
                country_name
            }
        }
    }
`;




const EDIT_USER_MUTATION = gql`
    mutation EditUser(
        $user_id: Int!
        $email: String!
        $first_name: String!
        $last_name: String!
        $country: Int!
        $city: String!
        $website: String!
        $age: Int!
        $hobbies: [String]!
        $avatar_link: String!
    ){
        editUser(
            user_id: $user_id
            email: $email
            first_name: $first_name
            last_name: $last_name
            country: $country 
            city: $city
            website: $website
            age: $age
            hobbies: $hobbies
            avatar_link: $avatar_link
        ) {
            user_id
        }
    }
`;



interface FormStateInterface {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    country: number;
    city: string;
    website: string;
    avatar_link: string;
    age: number;
    hobbies: string[];
}

interface ActionInterface {
    type: string;
    payload: any;
}

type HandleChangeType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>

const initialFormState = {
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    country: 0,
    city: "",
    website: "",
    avatar_link: "",
    age: 0,
    hobbies: [""],
}

const formStateReducer = (state: FormStateInterface, action: ActionInterface) => {
    switch(action.type) {
        case "userId": 
            return { ...state, user_id: +action.payload }
        case "firstName":
            return { ...state, first_name: action.payload }
        case "lastName":
            return { ...state, last_name: action.payload }
        case "email":
            return { ...state, email: action.payload }
        case "country":
            return { ...state, country: +action.payload }
        case "city":
            return { ...state, city: action.payload }
        case "website":
            return { ...state, website: action.payload }
        case "avatar_link":
            return { ...state, avatar_link: action.payload }
        case "age":
            return { ...state, age: +action.payload }
        case "hobbies": 
            return { ...state, hobbies: action.payload }
        case "userForEdit": 
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const EditProfilePage = () => {

    const { user_id } = useParams();

    const [ pathToEditedUser, setPathToEditedUser ] = useState<number> ();

    const [ formState, formStateDispatch ] = useReducer(formStateReducer, initialFormState);

    // const { data: userForEditData, loading: userForEditLoading, error: userForEditError } = useQuery(GET_USER_FOR_EDIT_QUERY, {
    //     variables: {
    //         user_id: +user_id,
    //     },
    //     onCompleted: (data) => {

    //         const { __typename, ...restOfUser } = data.getUserForEdit.user;

    //         const userForState = {
    //             ...restOfUser,
    //             country: +restOfUser.country.country_id,
    //             user_id: +restOfUser.user_id,
    //         }
    //         formStateDispatch({
    //             type: "userForEdit",
    //             payload: userForState,
    //         })
    //     }
    // });

    const [ getUserForEdit, { data: userForEditData, loading: userForEditLoading, error: userForEditError }] = useLazyQuery(GET_USER_FOR_EDIT_QUERY, {
        variables: {
            user_id: +user_id,
        },
        onCompleted: (data) => {

            const { __typename, ...restOfUser } = data.getUserForEdit.user;

            const userForState = {
                ...restOfUser,
                country: +restOfUser.country.country_id,
                user_id: +restOfUser.user_id,
            }
            formStateDispatch({
                type: "userForEdit",
                payload: userForState,
            })
        }
    });

    useEffect(() => {
        getUserForEdit()
    }, []);



    const [ editUser, { data } ] = useMutation(EDIT_USER_MUTATION, {
        variables: {
            ...formState
        },
        onCompleted: ({ editUser }) => {
            setPathToEditedUser(editUser.user_id);
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("form state:", formState);
        editUser();
        // console.log("returned data:", data);
    }

    const handleChange = (e: HandleChangeType) => {
        const { name, value } = e.target;

        const payloadValue: string | string[] = name === "hobbies"? value.split(",").map(hobby => {
            return hobby.trim();
        }): value;

        formStateDispatch({ type: name, payload: payloadValue });
    }



    return (
    <Layout>
        <EditProfilePageStyled>
            <section className="main-content__edit-profile-section">
                <div className="edit-profile__section-title-wrapper">
                    <SectionTitle title={"Edit profile"} />
                </div>

                <div className="edit-profile__form-wrapper">
                    <AddEditProfileForm 
                        countries={ userForEditData?.getUserForEdit.countries }
                        handleChange={ handleChange }
                        handleSubmit={ handleSubmit }
                        
                        formState={formState}
                    />
                </div>
            </section>
        </EditProfilePageStyled>
        {pathToEditedUser && <Redirect to={`/profile/${pathToEditedUser}`} />}
    </Layout>
    )
}

const EditProfilePageStyled = styled.main`
    .main-content__edit-profile-section {
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
    }
`;

export default EditProfilePage;


/* 

import React, { useReducer, ReactEventHandler } from 'react'
import styled from "styled-components";
import { useQuery, useMutation, gql } from "@apollo/client";

import Layout from "../components/layout.component";
import SectionTitle from "../elements/section-title.element";
import AddEditProfileForm from "../components/add-edit-profile-form.component";

interface AddEditProfile {
    user_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    country: number;
    city: string;
    website: string;
    avatar_link: string;
    age: number;
    hobbies: string[];
}

interface Action {
    type: string;
    payload: number | string | string[];
}

const initialFormState: AddEditProfile = {
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country: 0,
    city: "",
    website: "",
    avatar_link: "",
    age: 0,
    hobbies: [""],
}

const formStateReducer = (state: AddEditProfile, action: Action ) => {
    const { type, payload } = action;
    switch(type) {
        case "hobbies": 
            const newState = { ...state }
            console.log(newState)
            return newState;
        case "firstName": 
            return { ...state }
    
        default: 
            return state;
    }
}

const GET_COUNTRIES_QUERY = gql`
    query GetCountries {
        getCountries {
            country_id,
            country_name
        }
    }
`;

const AddEditProfilePage = () => {

    const [ formState, formStateDispatch ] = useReducer(formStateReducer, initialFormState);

    const { data: countriesData, loading: countriesLoading, error: countriesError } = useQuery(GET_COUNTRIES_QUERY);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const payloadValue = name === "hobbies"? value.split(",").map(hobby => {
            return hobby.trim()
        }): value;

        formStateDispatch({
            type: name,
            payload: payloadValue,
        });
    }

    return (
    <Layout>
        <AddEditProfilePageStyled>
            <section className="main-content__add-edit-profile-section">
                <div className="add-edit-profile__section-title-wrapper">
                    <SectionTitle title={"Add profile"} />
                </div>

                <div className="add-edit-profile__form-wrapper">
                    <AddEditProfileForm 
                        countries={ countriesData?.getCountries.concat({ country_id: "", country_name: ""}) }
                        handleChange={handleChange}
                    />
                </div>
            </section>
        </AddEditProfilePageStyled>
    </Layout>
    )
}

const AddEditProfilePageStyled = styled.main`
    .main-content__add-edit-profile-section {
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
    }
`;

export default AddEditProfilePage;

*/