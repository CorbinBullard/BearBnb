import { useState } from "react";
import * as sessionActions from "../../store/session.js";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal.js";
import "./LoginForm.css";

const LoginFormModal = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };
    const handleDemoUserClick = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential: "DemoUser", password: "password" }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    }

    return (
        <div id="login-modal-container">
            <h1 id="login-modal-login-title">Log In</h1>
            <form id="login-modal-form-component" onSubmit={handleSubmit}>
                <label className="login-feild-label">
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label className="login-feild-label">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p>{errors.credential}</p>
                )}
                <button type="submit" id="login-submit">Log In</button>
            </form>
            <a id="demo-user-login"
                onClick={handleDemoUserClick}
            >Login as Demo User</a>
        </div>
    )
}

export default LoginFormModal;
