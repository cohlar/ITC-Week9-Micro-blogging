import React from 'react';

export default function Message(props) {
    const { userName, content, date } = props;
    return (
        <div className='msg'>
            <div className='msg-header'>
                <span>{userName}</span>
                <span>{date}</span>
            </div>
            <div className='msg-content'>
                {content}
            </div>
         </div>
    );
}