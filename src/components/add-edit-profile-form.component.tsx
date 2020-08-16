import React from 'react'
import styled from "styled-components";

interface AddEditProfileFormProps {
    countries: { country_id: string, country_name: string }[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    //
    formState: {
        user_id?: number;
        first_name: string;
        last_name: string;
        email: string;
        password?: string;
        country: number;
        city: string;
        website: string;
        avatar_link: string;
        age: number;
        hobbies: string[];
    }
}

const AddEditProfileForm = ({ countries, handleChange, handleSubmit, formState }: AddEditProfileFormProps) => {

    const {
        user_id,
        first_name,
        last_name,
        email,
        password,
        country,
        city,
        website,
        avatar_link,
        age,
        hobbies,
    } = formState;
    
    return (
    <AddEditProfileFormStyled 
        onSubmit={handleSubmit}
        className="add-edit-profile-section__add-edit-profile-form">
        <div className="add-edit-profile-form__basic-info">
            <label htmlFor="firstName" className="add-edit-profile-form__label">First Name: {typeof user_id} </label>
            <input 
                type="text" id="firstName" 
                name="firstName" 
                className="add-edit-profile-form__input"
                value={first_name}
                onChange={handleChange}
                />
            <label htmlFor="lastName" className="add-edit-profile-form__label">Last Name</label>
            <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                className="add-edit-profile-form__input"
                value={last_name}
                onChange={handleChange}/>
            <label htmlFor="email" className="add-edit-profile-form__label">Email</label>
            <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="add-edit-profile-form__input"
                    value={email}
                    onChange={handleChange}/>
            { password !== undefined && (
            <>
                <label htmlFor="password" className="add-edit-profile-form__label">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="add-edit-profile-form__input"
                    value={password}
                    onChange={handleChange}/>
            </>
            )}
        </div>

        <div className="add-edit-profile-form__personal-info">
            <label htmlFor="country" className="add-edit-profile-form__label">Country</label>
            <select 
                value={country}
                name="country" 
                id="country"
                className="add-edit-profile-form__input"
                onChange={handleChange}>
                { countries && countries.map(({ country_id, country_name }) => {
                    return (
                        <option 
                            key={country_id}
                            value={country_id}
                            disabled={country_name === ""}
                            hidden={country_name === ""}>
                                {country_name}
                        </option>
                    );
                })}
            </select>

            <label htmlFor="city" className="add-edit-profile-form__label">City</label>
            <input 
                type="text" 
                id="city" 
                name="city" 
                className="add-edit-profile-form__input"
                value={city}
                onChange={handleChange}/>
            <label htmlFor="website" className="add-edit-profile-form__label">Website</label>
            <input 
                type="text" 
                id="website" 
                name="website" 
                className="add-edit-profile-form__input"
                value={website}
                onChange={handleChange}/>
            <label htmlFor="avatar_link" className="add-edit-profile-form__label">Profile Picture</label>
            <input 
                type="text" 
                id="avatar_link" 
                name="avatar_link" 
                className="add-edit-profile-form__input"
                value={avatar_link}
                onChange={handleChange}/>
            <label htmlFor="age" className="add-edit-profile-form__label">Age</label>
            <input 
                min="18" 
                type="number" 
                id="age" 
                name="age" 
                className="add-edit-profile-form__input"
                value={age}
                onChange={handleChange}/>
            <label htmlFor="hobbies" className="add-edit-profile-form__label">Interests</label>
            <textarea 
                id="hobbies" 
                name="hobbies" 
                className="add-edit-profile-form__input"
                placeholder="Please separate your interests with commas" 
                value={hobbies.join(", ")}
                onChange={handleChange}
            />
        </div>
        <button type="submit" className="register-form__add-edit-submit-button">Submit</button>
    </AddEditProfileFormStyled>
    )
}

const AddEditProfileFormStyled = styled.form`

    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    > div {
        display: flex;
        flex-direction: column;
        padding-bottom: 1rem;
        border-bottom: 1px solid #B8B8B8;
    }

    .add-edit-profile-form__label {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    label[for=country] {
        margin-top: 0;
    }

    .register-form__add-edit-submit-button {
        background-color: #4D4D4D;
        color: white;
    }
`;

export default AddEditProfileForm;



/* 
import React from 'react'
import styled from "styled-components";

interface AddEditProfileFormProps {
    countries: { country_id: string, country_name: string }[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AddEditProfileForm = ({ countries, handleChange }: AddEditProfileFormProps) => {

    return (
    <AddEditProfileFormStyled className="add-edit-profile-section__add-edit-profile-form">
        <div className="add-edit-profile-form__basic-info">
            <label htmlFor="firstName" className="add-edit-profile-form__label">First Name</label>
            <input 
                type="text" id="firstName" 
                name="firstName" 
                className="add-edit-profile-form__input"
                onChange={handleChange}
                />
            <label htmlFor="lastName" className="add-edit-profile-form__label">Last Name</label>
            <input type="text" id="lastName" name="lastName" className="add-edit-profile-form__input"/>
            <label htmlFor="email" className="add-edit-profile-form__label">Email</label>
            <input type="email" id="email" name="email" className="add-edit-profile-form__input"/>
            <label htmlFor="password" className="add-edit-profile-form__label">Password</label>
            <input type="password" id="password" name="password" className="add-edit-profile-form__input"/>
        </div>

        <div className="add-edit-profile-form__personal-info">
            <label htmlFor="country" className="add-edit-profile-form__label">Country</label>

            <select 
                value={""}
                name="country" 
                id="country"
                className="add-edit-profile-form__input">
                { countries && countries.map(({ country_id, country_name }) => {
                    return (
                        <option 
                            key={country_id}
                            value={country_id}
                            disabled={country_id === ""}
                            hidden={country_id === ""}
                            >
                                {country_name}
                        </option>
                    );
                })}
            </select>


            <label htmlFor="city" className="add-edit-profile-form__label">City</label>
            <input type="text" id="city" name="city" className="add-edit-profile-form__input"/>
            <label htmlFor="website" className="add-edit-profile-form__label">Website</label>
            <input type="text" id="website" name="website" className="add-edit-profile-form__input"/>
            <label htmlFor="profilePicture" className="add-edit-profile-form__label">Profile Picture</label>
            <input type="text" id="profilePicture" name="profilePicture" className="add-edit-profile-form__input"/>
            <label htmlFor="age" className="add-edit-profile-form__label">Age</label>
            <input min="18" type="number" id="age" name="age" className="add-edit-profile-form__input"/>
            <label htmlFor="hobbies" className="add-edit-profile-form__label">Interests</label>
            <textarea 
                id="hobbies" 
                name="hobbies" 
                className="add-edit-profile-form__input"
                placeholder="Please separate your interests with commas" 
                onChange={handleChange}
                />
        </div>
        <button type="submit" className="register-form__add-edit-submit-button">Submit</button>
    </AddEditProfileFormStyled>
    )
}

const AddEditProfileFormStyled = styled.form`

    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    > div {
        display: flex;
        flex-direction: column;
        padding-bottom: 1rem;
        border-bottom: 1px solid #B8B8B8;
    }

    .add-edit-profile-form__label {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    label[for=country] {
        margin-top: 0;
    }

    .register-form__add-edit-submit-button {
        background-color: #4D4D4D;
        color: white;
    }
`;

export default AddEditProfileForm;

*/