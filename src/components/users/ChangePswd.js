import React, { useEffect, useRef, useState } from "react";
import {
    faCheck,
    faTimes,
    faInfoCircle,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import schema from "../../utils/schema";
import * as UAPI from "../../api/usersApi";

const ChangePswd = () => {
    const [csrf, setCsrf] = useState("");

    const [opswd, setOpswd] = useState("");
    const [validOpswd, setValidOpswd] = useState(false);

    const [pswd, setPswd] = useState("");
    const [validPswd, setValidPswd] = useState(false);
    const [pswdFocus, setPswdFocus] = useState(false);

    const [cpswd, setCpswd] = useState("");
    const [validCpswd, setValidCpswd] = useState(false);
    const [cpswdFocus, setCpswdFocus] = useState(false);

    const [err, setErr] = useState("");
    const errRef = useRef();

    const [success, setSuccess] = useState(false);
    const successRef = useRef();

    const [inProgress, setInProgress] = useState(false);

    const getCsrf = async () => {
        const res = await UAPI.getCsrf();
        if (res.success) {
            setCsrf(res.csrf);
        }
    };

    useEffect(() => {
        getCsrf();
    }, []);

    useEffect(() => {
        setValidPswd(schema.validate(pswd));
        setValidCpswd(pswd === cpswd);
        setValidOpswd(schema.validate(opswd));
        setErr("");
    }, [pswd, cpswd, opswd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = schema.validate(opswd);
        const v2 = schema.validate(pswd);
        const v3 = pswd === cpswd;
        if (!v1 || !v2 || !v3) {
            setErr("Please enter valid data!");
            return;
        }

        setErr("");
        setInProgress(true);
        setSuccess(false);

        const res = await UAPI.changePswd(opswd, pswd, cpswd, csrf);

        if (res.success) {
            setInProgress(false);
            setSuccess(true);
            successRef.current.focus();

            setOpswd("");
            setPswd("");
            setCpswd("");
        } else {
            setInProgress(false);
            setErr(res.msg);
            errRef.current.focus();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <h2>change your password</h2>
            </div>
            {/* old password */}
            <div className="mb-4">
                <label htmlFor="oldPassword">
                    Old Password:
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={validOpswd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={validOpswd || !opswd ? "hide" : "invalid"}
                    />
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    aria-describedby="oldPasswordHelp"
                    placeholder="old Password"
                    value={opswd}
                    onChange={(e) => setOpswd(e.target.value)}
                />
                <div id="oldPasswordHelp" className="visually-hidden">
                    Insert your old password
                </div>
            </div>

            {/* password */}
            <div className="mb-4">
                <label htmlFor="Password">
                    Password:
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={validPswd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={validPswd || !pswd ? "hide" : "invalid"}
                    />
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="Password"
                    aria-describedby="passwordHelp"
                    aria-invalid={validPswd ? "false" : "true"}
                    placeholder="Password"
                    value={pswd}
                    onChange={(e) => setPswd(e.target.value)}
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
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                </div>
            </div>

            {/* confirm password */}
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password:
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={validCpswd && cpswd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={validCpswd || !cpswd ? "hide" : "invalid"}
                    />
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    aria-describedby="confirmPasswordHelp"
                    aria-invalid={validCpswd ? "false" : "true"}
                    placeholder="Confirm Password"
                    value={cpswd}
                    onChange={(e) => setCpswd(e.target.value)}
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

            <div className="mb-4">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                        !validCpswd || !validPswd || !validOpswd ? true : false
                    }
                >
                    Change Password
                </button>

                {inProgress ? (
                    <span className="ms-2">
                        <FontAwesomeIcon icon={faSpinner} className="spinner" />
                    </span>
                ) : (
                    err && (
                        <span className="ms-2 form-error">
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    )
                )}
            </div>

            <div
                className={err ? "mb-2 form-text form-error" : "d-none"}
                ref={errRef}
            >
                {err}
            </div>

            <div
                className={success ? "mb-2 success" : "d-none"}
                ref={successRef}
            >
                Password Changed successfully
            </div>
        </form>
    );
};

export default ChangePswd;
