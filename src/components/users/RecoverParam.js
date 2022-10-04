import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import * as UAPI from "../../api/usersApi";

const RecoverParam = () => {
    const { code } = useParams();
    const [csrf, setCsrf] = useState("");
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(false);

    // const

    const getCsrf = async () => {
        if (!code) {
            setErr(true);
            return;
        }

        const response = await UAPI.recoverPswdGet(code);
        if (response.success) {
            // return response;
            setCsrf(response.csrf);
            setSuccess(true);
        }
    };

    useEffect(() => {
        getCsrf();
    }, []);

    return (
        <>
            {success && (
                <Navigate to="/recover" replace={true} state={{ code, csrf }} />
            )}

            {err && <Navigate to="/" />}
        </>
    );
};

export default RecoverParam;
