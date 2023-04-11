import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/Daco_4226817.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <ul id='nav-container'>
            <li>
                <NavLink exact to="/" className='nav-home-button'><img src={logo} className='logo-image'/></NavLink>
            </li>
            {isLoaded && (

                <li className='nav-profile-button'>
                    {sessionUser && <NavLink to={'/spots/new'}>Create a New Spot</NavLink>}
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
