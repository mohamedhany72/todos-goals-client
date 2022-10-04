import React, { useState, useEffect, useRef } from "react";
import { useLocation, Navigate } from "react-router-dom";
import {
    faCheck,
    faTimes,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import schema from "../../utils/schema";

import * as UAPI from "../../api/usersApi";

const Recover = () => {
    const location = useLocation();

    const code = location?.state?.code;
    const csrf = location?.state?.csrf;

    const [navigate, setNavigate] = useState(false);

    const [pswd, setPswd] = useState("");
    const [validPswd, setValidPswd] = useState(false);
    const [pswdFocus, setPswdFocus] = useState(false);

    const [cpswd, setCpswd] = useState("");
    const [validCpswd, setValidCpswd] = useState(false);
    const [cpswdFocus, setCpswdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const pswdRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        if (!code || !csrf) {
            setNavigate(true);
        } else {
            pswdRef.current.focus();
        }
    }, []);

    // validate pswd & cpswd
    useEffect(() => {
        setValidPswd(schema.validate(pswd));
        setValidCpswd(pswd === cpswd);
        setErrMsg("");
    }, [pswd, cpswd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!schema.validate(pswd) || !(pswd === cpswd)) {
            setErrMsg("Please enter valid data");
            errRef.current.focus();
            return;
        }

        const res = await UAPI.recoverPswdPut(pswd, cpswd, code, csrf);
        if (!res.success) {
            setErrMsg(res.msg);
            errRef.current.focus();
            return;
        } else {
            setNavigate(true);
            return;
        }
    };

    return (
        <section>
            {navigate ? (
                <>
                    <Navigate to="/" />
                </>
            ) : (
                <div className="container">
                    <h1>Recover your password</h1>
                    <div className="sign-up-page">
                        <div className="sign-up-form">
                            <form onSubmit={handleSubmit}>
                                {/* password */}
                                <div className="mb-3">
                                    <label htmlFor="signInInputPassword">
                                        Password:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={
                                                validPswd ? "valid" : "hide"
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={
                                                validPswd || !pswd
                                                    ? "hide"
                                                    : "invalid"
                                            }
                                        />
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="signInInputPassword"
                                        ref={pswdRef}
                                        aria-describedby="passwordHelp"
                                        aria-invalid={
                                            validPswd ? "false" : "true"
                                        }
                                        placeholder="Password"
                                        value={pswd}
                                        onChange={(e) =>
                                            setPswd(e.target.value)
                                        }
                                        onFocus={() => setPswdFocus(true)}
                                        onBlur={() => setPswdFocus(false)}
                                        required
                                    />
                                    <div
                                        id="passwordHelp"
                                        className={
                                            pswdFocus && pswd && !validPswd
                                                ? "sign-up-error"
                                                : "offscreen"
                                        }
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.
                                        <br />
                                        Must include uppercase and lowercase
                                        letters, a number and a special
                                        character.
                                        <br />
                                    </div>
                                </div>

                                {/* confirm password */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label"
                                    >
                                        Confirm Password:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={
                                                validCpswd && cpswd
                                                    ? "valid"
                                                    : "hide"
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={
                                                validCpswd || !cpswd
                                                    ? "hide"
                                                    : "invalid"
                                            }
                                        />
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        aria-describedby="confirmPasswordHelp"
                                        aria-invalid={
                                            validCpswd ? "false" : "true"
                                        }
                                        placeholder="Confirm Password"
                                        value={cpswd}
                                        onChange={(e) =>
                                            setCpswd(e.target.value)
                                        }
                                        onFocus={() => setCpswdFocus(true)}
                                        onBlur={() => setCpswdFocus(false)}
                                        required
                                    />
                                    <div
                                        id="confirmPasswordHelp"
                                        className={
                                            cpswdFocus && cpswd && !validCpswd
                                                ? "sign-up-error"
                                                : "offscreen"
                                        }
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        passwords must match
                                    </div>
                                </div>

                                {/* submit btn */}
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-3"
                                    disabled={
                                        !validPswd || !validCpswd ? true : false
                                    }
                                >
                                    Recover
                                </button>

                                <p
                                    ref={errRef}
                                    aria-live="assertive"
                                    className={
                                        errMsg ? "sign-up-error" : "hidden"
                                    }
                                >
                                    {errMsg}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Recover;
