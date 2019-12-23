import React, { useState, useEffect } from 'react';
import './profile.css';
import { getUser, updateUserDisplayName, updateUserPhoto, uploadUserPhoto, setUserInFirestore } from '../../lib/firebase.js';
import Avatar from '../../components/Avatar.js';

export default function Profile() {
    const [usernameInput, setUsernameInput] = useState('');
    const [savedUsername, setSavedUsername] = useState('');
    const [avatarInput, setAvatarInput] = useState('');
    const [avatarURL, setAvatarURL] = useState('');

    const user = getUser();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (usernameInput !== savedUsername) {
            updateUserDisplayName(user, usernameInput);
            setSavedUsername(usernameInput);
        }
        if (avatarInput) {
            const file = document.querySelector('#avatar-input').files[0];
            const url = await uploadUserPhoto(file, user.uid);
            setAvatarURL(url);
            updateUserPhoto(user, url);
            setAvatarInput('');
        }
        setUserInFirestore(user);
    };

    useEffect(() => {
        setUsernameInput(user.displayName);
        setSavedUsername(user.displayName);
        setAvatarURL(user.photoURL);
    }, []);

    return (
        <main>
            <h1 className='profile-header'>
                Profile
                <Avatar
                    avatarURL={avatarURL}
                    username={user.displayName}
                    className='avatar-profile'
                />
            </h1>

            <form>
                <label htmlFor='username-input'>Edit your user name:</label>
                <input
                    type='text'
                    id='username-input'
                    value={usernameInput}
                    onChange={(event) => setUsernameInput(event.target.value)}
                />

                <label htmlFor='avatar-input'>Upload a profile picture:</label>
                <input
                    type='file'
                    id='avatar-input'
                    accept='image/png, image/jpg, image/jpeg'
                    onChange={(event) => setAvatarInput(event.target.value)}
                />

                <button
                    className='save-btn'
                    onClick={onSubmit}
                    disabled={(savedUsername === usernameInput && !avatarInput)}
                >
                    Save
                </button>
            </form>
        </main>
    );
}