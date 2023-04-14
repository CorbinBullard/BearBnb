import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/Bearbnb.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <ul id='nav-container'>
            <li id='nav-home-button-icon'>
                <NavLink exact to="/" className='nav-home-button'><img src={logo} className='logo-image'/></NavLink>
            </li>
            {isLoaded && (

                <li className='nav-profile-button'>
                    {sessionUser && <NavLink to={'/spots/new'} className='create-a-new-spot'>Create a New Spot</NavLink>}
                    <ProfileButton id="profile-button" user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
