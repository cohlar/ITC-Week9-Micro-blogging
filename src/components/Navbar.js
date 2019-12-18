import React from 'react';
import {
    Link,
} from 'react-router-dom';

export default function Navbar() {
    return (
        <header>
            <Link to='/' className='nav-link'>
                Home
                </Link>
            <Link to='/profile' className='nav-link'>
                Profile
                </Link>
        </header>
    );
}