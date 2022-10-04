import React, { useState, useRef, useEffect } from "react";

import Header from "../Header";
import * as UAPI from "../../api/usersApi";

const Forget = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const emailRef = useRef();
    const errorRef = useRef();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const sendEmail = async (e) => {
        e.preventDefault();
        const { success, msg } = await UAPI.forgetPswd(email);
        if (success) {
            setSuccess(true);
        } else {
            setError(msg);
            errorRef.current.focus();
        }
    };

    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <h1>recover your password</h1>
                    <div className="sign-in-page">
                        {!success ? (
                            <>
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
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Email"
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

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={sendEmail}
                                    >
                                        Send Email
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <p>
                                    Link is sent to your email, please use it to
                                    recover your password
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Forget;
