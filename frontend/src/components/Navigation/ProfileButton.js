import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push("/");
    };

    const manageSpots = () => {

    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : "-hidden");

    return (
        <>
            <a onClick={openMenu} className="profile-profile-button">
                <i className="fas fa-user-circle" />
            </a>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        {/* <li>{user.username}</li> */}
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <li>
                            <NavLink to="/spots/current">Manage Your Spots</NavLink>
                        </li>
                        <li>
                            <button id="logout" onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}

                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
