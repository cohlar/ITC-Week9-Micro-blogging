import React from 'react';

export default function PostMessage(props) {
    return (
        <div className='post-msg-container'>
            <textarea placeholder='What you have in mind...' className='post-msg-input'></textarea>
            <button className='post-msg-btn'>Post</button>
        </div>
    );
}