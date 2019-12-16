import React from 'react';
import './profile.css';

export default class Profile extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <main>
                <h1>Profile</h1>

                <label htmlFor='username'>User Name</label>
                <input type='text' id='username' />
                <button className='save-btn'>Save</button>
            </main>
        );
    }
}