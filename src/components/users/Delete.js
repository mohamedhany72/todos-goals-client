import React, { useState, useEffect, useRef } from "react";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import * as UAPI from "../../api/usersApi";
import { verifyUser } from "../../redux/user/user";
import { dispatchEmpty } from "../../utils/dispatchGroup";
import schema from "../../utils/schema";

const Delete = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [csrf, setCsrf] = useState("");

    const [pswd, setPswd] = useState("");
    const [validPswd, setValidPswd] = useState(false);

    const [cdelete, setCdelete] = useState("");
    const [validCdelete, setValidCdelete] = useState(false);

    const [err, setErr] = useState("");
    const errRef = useRef();

    const [inProgress, setInProgress] = useState(false);

    const [sendVerificationMsg, setSendVerificationMsg] = useState("");
    const [verifyErr, setVerifyErr] = useState("");

    const [logoutAllErr, setLogoutAllErr] = useState("");

    const getCsrf = async () => {
        const res = await UAPI.getCsrf();
        if (res.success) {
            setCsrf(res.csrf);
        } else {
            alert("no csrf");
        }
    };

    // get csrf token
    useEffect(() => {
        getCsrf();
    }, []);

    useEffect(() => {
        setErr("");
        setValidPswd(schema.validate(pswd));
    }, [pswd]);

    useEffect(() => {
        setErr("");
        setValidCdelete(cdelete === "I want to delete my account");
    }, [cdelete]);

    const handleDeleteAcount = async (e) => {
        setInProgress(true);
        e.preventDefault();
        const res = await UAPI.deleteUser(cdelete, pswd, csrf);

        if (res.success) {
            alert("User Deleted!");
            setInProgress(false);
            dispatchEmpty(dispatch);
        } else {
            setErr(res.msg);
            setInProgress(false);
        }
    };

    const handleSendVerification = async () => {
        const res = await UAPI.sendVerify();
        if (res.success) {
            setSendVerificationMsg(res.msg);
            if (res.msg === "user already verified!") {
                dispatch(verifyUser());
            }
        } else {
            setVerifyErr(res.msg);
        }
    };

    const logoutAllBrowseres = async () => {
        setLogoutAllErr("");
        const res = await UAPI.logoutAll();
        if (res.success) {
            dispatchEmpty(dispatch);
        } else {
            setLogoutAllErr(res.msg);
        }
    };

    return (
        <div className="mt-5">
            <form className="mb-4" onSubmit={handleDeleteAcount}>
                <div className="mb-4">
                    <h2>change your password</h2>
                </div>
                {/* password */}
                <div className="mb-4 text-start">
                    <label htmlFor="deleteFormPassword">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="deleteFormPassword"
                        aria-describedby="deleteFormPasswordHelp"
                        placeholder="Password"
                        value={pswd}
                        onChange={(e) => setPswd(e.target.value)}
                    />
                    <div
                        id="deleteFormPasswordHelp"
                        className="visually-hidden"
                    >
                        Insert your password
                    </div>
                </div>

                {/* password */}
                <div className="mb-4 text-start">
                    <label htmlFor="deleteConfirmation">
                        Please type{" "}
                        <span className="fw-bold">
                            I want to delete my account
                        </span>{" "}
                        in the input below to confirm the deletion of your
                        account.
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="deleteConfirmation"
                        placeholder="Confirmation Message"
                        value={cdelete}
                        onChange={(e) => setCdelete(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!validCdelete || !validPswd ? true : false}
                    >
                        Delete Account
                    </button>

                    {inProgress ? (
                        <span className="ms-2">
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className="spinner"
                            />
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
            </form>
            <hr />
            <div className="mt-5">
                <button
                    className="btn btn-primary"
                    onClick={logoutAllBrowseres}
                >
                    Logout from all browsers
                </button>
                {logoutAllErr && (
                    <div className="mb-2 form-text form-error">
                        {logoutAllErr}
                    </div>
                )}
            </div>

            {!user.verified && (
                <>
                    <hr />
                    <div className="mt-5 mb-3">
                        <button
                            className="btn btn-primary"
                            onClick={handleSendVerification}
                        >
                            Send Verification
                        </button>
                    </div>
                </>
            )}
            {sendVerificationMsg && (
                <div className="mb-2 success">{sendVerificationMsg}</div>
            )}

            {verifyErr && (
                <div className="mb-2 form-text form-error">{verifyErr}</div>
            )}
        </div>
    );
};

export default Delete;
