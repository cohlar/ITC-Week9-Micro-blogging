import React, { useState, useEffect } from 'react';
import { getUserById } from '../lib/firebase.js';
import Avatar from './Avatar.js';

export default function Message(props) {
    const { userId, content, date } = props;
    const [username, setUsername] = useState('');
    const [avatarURL, setAvatarURL] = useState('');

    const setUserAsync = async () => {
        const user = await getUserById(userId);
        setUsername(user.data().userName);
        setAvatarURL(user.data().avatarURL);
    };

    useEffect( () => {
        setUserAsync();
    }, []);

    if (username) {
        return (
            <div className='msg'>
                <div className='msg-header'>
                    <span className='user'>
                        <Avatar
                            avatarURL={avatarURL ? avatarURL : 'https://picsum.photos/200/300'}
                            username={username}
                            className='avatar-msg'
                        />

                        {username}
                    </span>
                    <span>{date.substring(0, 10) + ' at ' + date.substring(11, 19)}</span>
                </div>
                <div className='msg-content'>
                    {content}
                </div>
            </div>
        );
    } else {
        return null;
    }
}