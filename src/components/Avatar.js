import React from 'react';

export default function Avatar(props) {
    const { avatarURL, username, className } = props;

    return (
        <img
            src={avatarURL}
            alt={username + ' avatar picture'}
            className={'avatar ' + className}
        />
    );

}