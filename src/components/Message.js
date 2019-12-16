import React from 'react';

export default function Message(props) {
    const { username, message, timestamp } = props;
    return (
        <div className='msg'>
            <div className='msg-header'>
                <span>{username}</span>
                <span>{timestamp}</span>
            </div>
            <div className='msg-content'>
                {message}
            </div>
         </div>
    );
}