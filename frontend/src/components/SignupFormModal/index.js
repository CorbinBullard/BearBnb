import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignUpFormPage.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [preErrors, setPreErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signUp({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };
    useEffect(() => {
        const errorsObj = {};
        if (!username) errorsObj.username = "Username is required";
        if (!email) errorsObj.email = "Email is required";
        if (!firstName) errorsObj.firstName = "First name is required";
        if (!lastName) errorsObj.lastName = "Last name is required";
        if (!password) errorsObj.password = "password is required";
        if (password && password !== confirmPassword) errorsObj.confirmPassword = "passwords do not match";
        setPreErrors(errorsObj);
    }, [email, username, firstName, lastName, password, confirmPassword])

    return (
        <div id="sign-up-modal-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label className="sign-up-form-label">
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p className="errors">{errors.email}</p>}
                <label className="sign-up-form-label">
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p className="errors">{errors.username}</p>}
                <label className="sign-up-form-label">
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p className="errors">{errors.firstName}</p>}
                <label className="sign-up-form-label">
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p className="errors">{errors.lastName}</p>}
                <label className="sign-up-form-label">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p className="errors">{errors.password}</p>}
                <label className="sign-up-form-label">
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && (
                    <p className="errors">{errors.confirmPassword}</p>
                )}
                <button id="create-new-spot-form-button" type="submit" disabled={Object.values(preErrors).length} className={Object.values(preErrors).length ? "disabled" : ''}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
