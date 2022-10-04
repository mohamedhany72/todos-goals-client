import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as UAPI from "../../api/usersApi";

const VerifyUser = () => {
    const { code } = useParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    // const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");

    const verify = async () => {
        const res = await UAPI.verify(code);
        if (!res.success) {
            setErr(true);
            // setMsg(res.msg);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!code) {
            setErr("Please use the link from email!");
        }

        verify();
    }, []);

    return (
        <section>
            <div className="container">
                <h1>Verify Your account</h1>
                <div className="sign-in-page">
                    {loading ? (
                        <div className="loading">Loading</div>
                    ) : success ? (
                        <div>
                            <p>You are successfully verified</p>
                            <p>
                                Go to <Link to="/">home</Link> page
                            </p>
                        </div>
                    ) : (
                        err && (
                            <div>
                                <p>Error verifying your account</p>
                                <p>
                                    please send another verification request
                                    from your <Link to="/profile">Profile</Link>{" "}
                                    page
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default VerifyUser;
