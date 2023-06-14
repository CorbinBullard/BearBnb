import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/Bearbnb.png'
import './Navigation.css';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');


    return (
        <div id='nav-page-container'>
            <ul id='nav-container'>
                <li id='nav-home-button-icon'>
                    <NavLink exact to="/" className='nav-home-button'><img src={logo} className='logo-image' /></NavLink>
                </li>
                {isLoaded && (
                    <>
                        <li>
                            <SearchBar />
                        </li>
                        <li className='nav-profile-button'>
                            {sessionUser && <NavLink to={'/spots/new'} className='create-a-new-spot'>Create a New Spot</NavLink>}
                            <ProfileButton id="profile-button" user={sessionUser} />
                        </li>
                    </>
                )}
            </ul>
            {/* <div id="search-price-container">
                <input
                    placeholder="Min Price"
                    type="number"
                    value={min}
                    onChange={e => setMin(e.target.value)}
                />
                <input
                    placeholder="Max Price"
                    type="number"
                    value={max}
                    onChange={e => setMax(e.target.value)}
                />
            </div> */}
        </div>
    );
}

export default Navigation;
