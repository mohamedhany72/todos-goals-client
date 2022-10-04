import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import validator from "email-validator";
import { login } from "../../api/usersApi";
import Header from "../Header";

import { dispatchIntial } from "../../utils/dispatchGroup";

const Login = () => {
    const dispatch = useDispatch();

    const emailRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");

    const [navigate, setNavigate] = useState(false);
    const [error, setError] = useState("");

    // focus email field on first render
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const logMeIn = async (e) => {
        e.preventDefault();
        // check if email is valid
        const validEmail = validator.validate(email);
        if (!validEmail) {
            setError("please enter valid email");
            errorRef.current.focus();
            return;
        }
        const res = await login(email, pswd);

        if (!res.success) {
            setError(res.msg);
            errorRef.current.focus();
            return;
        }

        dispatchIntial(dispatch);

        setError("");

        setNavigate(true);
        return;
    };

    if (navigate) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="sign-in-page">
                    <h1>sign in</h1>

                    <form>
                        <div className="mb-3">
                            <label
                                for="signInInputEmail"
                                className="form-label visually-hidden"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="signInInputEmail"
                                ref={emailRef}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                // aria-describedby="emailHelp"
                                placeholder="Email"
                            />
                            {/* <div id="emailHelp" class="form-text form-error">
                                We'll never share your email with anyone else.
                            </div> */}
                        </div>
                        <div className="mb-3">
                            <label
                                for="signInInputPassword"
                                className="form-label visually-hidden"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="signInInputPassword"
                                // aria-describedby="passwordHelp"
                                placeholder="Password"
                                value={pswd}
                                onChange={(e) => setPswd(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="mb-3">
                                <div
                                    id="error"
                                    className="form-text form-error"
                                    ref={errorRef}
                                >
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* <div class="mb-3 form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="signInCheck"
                            />
                            <label class="form-check-label" for="signInCheck">
                                remembre me
                            </label>
                        </div> */}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) => logMeIn(e)}
                        >
                            login
                        </button>
                    </form>
                    <div className="mb-3"></div>
                    <div className="mb-3">
                        <Link to="/forget" className="btn btn-primary">
                            Forget Password
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
