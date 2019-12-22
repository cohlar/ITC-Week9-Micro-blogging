import React from 'react';
import {
    Link,
} from 'react-router-dom';

export default function Navbar(props) {
    const { isSignedIn, signOut } = props;
    return (
        <header>
            <Link to='/' className='nav-link'>
                Home
            </Link>
            <Link to='/profile' className='nav-link'>
                Profile
            </Link>

            {isSignedIn &&
                <Link to='/' className='nav-link' onClick={signOut}>
                    Sign out
                </Link>
            }
        </header>
    );
}