import axios from "axios";
import {
    setRefreshCookie,
    setBrowserCookie,
    clearCookies
} from "../utils/setCookies";

const USERS_URL = "/users";

const REGISTER_URL = `${USERS_URL}/register`;
const LOGIN_URL = `${USERS_URL}/login`;
const REFRESH_URL = `${USERS_URL}/refresh`;
const GET_USER_URL = `${USERS_URL}/user`;
const VERIFY_URL = `${USERS_URL}/verify`;
const SEND_VERIFY_URL = `${USERS_URL}/sendverify`;
const CSRF_URL = `${USERS_URL}/csrf`;
const UPDATE_URL = `${USERS_URL}/update`;
const CHANGE_PSWD_URL = `${USERS_URL}/changepassword`;
const FORGET_PSWD_URL = `${USERS_URL}/forgetpassword`;
const RECOVER_PSWD_URL = `${USERS_URL}/recoverpassword`;
const ACCESS_URL = `${USERS_URL}/getaccess`;
const LOGOUT_URL = `${USERS_URL}/logout`;
const LOGOUT_ALL_URL = `${USERS_URL}/logoutall`;
const DELETE_URL = `${USERS_URL}/delete`;

const success = true;

const handleErr = (res) => {
    let errMsg;
    if (res.response.status === 0) {
        errMsg = "No Server Response";
    } else {
        errMsg = res.response?.data;
    }

    return {
        success: false,
        status: res.response.status,
        msg: errMsg
    };
};

const setAuthHeader = (res) => {
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${res.data.access}`;
};

const unsetAuthHeader = () => {
    axios.defaults.headers.common["Authorization"] = ``;
};

const register = async (name, email, gender, pswd, cpswd) => {
    const res = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, email, gender, pswd, cpswd }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );

    if (res.message) {
        return handleErr(res);
    }

    setBrowserCookie(res?.data?.browser);
    setRefreshCookie(res?.data?.refresh);
    setAuthHeader(res);

    return {
        success,
        user: res?.data?.user
    };
};

const login = async (email, pswd) => {
    const res = await axios.post(LOGIN_URL, JSON.stringify({ email, pswd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    });

    if (res.message) {
        return handleErr(res);
    }

    setBrowserCookie(res?.data?.browser);
    setRefreshCookie(res?.data?.refresh);
    setAuthHeader(res);

    return {
        success,
        user: res?.data?.user
    };
};

const getUser = async () => {
    const res = await axios.get(GET_USER_URL);

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        user: res?.data?.user
    };
};

const refresh = async () => {
    const res = await axios.get(
        REFRESH_URL,
        {},
        {
            withCredentials: true
        }
    );

    if (res.message) {
        return handleErr(res);
    }

    setRefreshCookie(res?.data?.refresh);
    setAuthHeader(res);

    return {
        success,
        user: res?.data?.user
    };
};

const getAccess = async () => {
    const res = await axios.get(
        ACCESS_URL,
        {},
        {
            withCredentials: true
        }
    );

    if (res.message) {
        return handleErr(res);
    }
    setAuthHeader(res);
    return {
        success,
        access: res.data.access,
        status: 200
        // ,
        // msg: "access added"
    };
};

const verify = async (code) => {
    const res = await axios.get(`${VERIFY_URL}/${code}`);

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        msg: res?.body
    };
};

const sendVerify = async () => {
    const res = await axios.get(SEND_VERIFY_URL, {}, { withCredentials: true });

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        msg: res?.data
    };
};

const getCsrf = async () => {
    const res = await axios.get(CSRF_URL, {}, { withCredentials: true });

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        csrf: res?.data?.csrfToken
    };
};

const update = async (formData, cb) => {
    const res = await axios.put(UPDATE_URL, formData, {
        // headers: { "Content-Type": "multipart/form-data" },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        onUploadProgress: (data) => {
            cb(Math.round(100 * (data.loaded / data.total)));
        }
    });

    if (res.message) {
        return handleErr(res);
    }

    setRefreshCookie(res?.data?.refresh);
    setAuthHeader(res);

    return {
        success,
        user: res?.data?.user
    };
};

const changePswd = async (opswd, pswd, cpswd, _csrf) => {
    const res = await axios.put(
        CHANGE_PSWD_URL,
        JSON.stringify({ opswd, pswd, cpswd, _csrf }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        msg: res?.data
    };
};

const forgetPswd = async (email) => {
    const res = await axios.post(FORGET_PSWD_URL, JSON.stringify({ email }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    });

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        msg: res?.data
    };
};

const recoverPswdGet = async (code) => {
    const res = await axios.get(`${RECOVER_PSWD_URL}/${code}`);

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        csrf: res?.data?.csrfToken,
        code: res?.data?.code
    };
};

const recoverPswdPut = async (pswd, cpswd, code, _csrf) => {
    const res = await axios.put(
        RECOVER_PSWD_URL,
        JSON.stringify({ pswd, cpswd, code, _csrf }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        msg: res?.data
    };
};

const logout = async () => {
    const res = await axios.delete(
        LOGOUT_URL,
        {},
        {
            withCredentials: true
        }
    );

    if (res.message) {
        return handleErr(res);
    }

    unsetAuthHeader();
    clearCookies();

    return {
        success,
        msg: res?.data
    };
};

const logoutAll = async () => {
    const res = await axios.delete(
        LOGOUT_ALL_URL,
        {},
        {
            withCredentials: true
        }
    );

    if (res.message) {
        return handleErr(res);
    }

    unsetAuthHeader();
    clearCookies();

    return {
        success,
        msg: res?.data
    };
};

const deleteUser = async (confirmMsg, pswd, _csrf) => {
    const res = await axios.post(
        DELETE_URL,
        JSON.stringify({ confirmMsg, pswd, _csrf }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );

    if (res.message) {
        return handleErr(res);
    }

    unsetAuthHeader();
    clearCookies();

    return {
        success,
        msg: res?.data
    };
};

export {
    register,
    login,
    refresh,
    getAccess,
    getUser,
    verify,
    sendVerify,
    getCsrf,
    update,
    changePswd,
    forgetPswd,
    recoverPswdGet,
    recoverPswdPut,
    logout,
    logoutAll,
    deleteUser,
    handleErr
};
