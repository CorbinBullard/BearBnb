import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";
import './Navigation.css';

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
            <button onClick={openMenu} className="profile-profile-button">
                <i id="profile-bars" className="fa fa-bars" /> <i id="profile-icon" className="fa fa-user-circle" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        {/* <li>{user.username}</li> */}

                        <li id="user-name">Hello, {user.firstName}</li>
                        <li id="user-email">{user.email}</li>
                        <li>
                            <NavLink id="profile-manage-spots" to="/spots/current">Manage Your Spots</NavLink>
                        </li>
                        <li>
                            <button id="logout" onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li id="login" className="modal-menu-item">
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}

                            />

                        </li>
                        <li id="sign-up" className="modal-menu-item">
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
