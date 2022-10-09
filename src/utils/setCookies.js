import Cookies from "js-cookie";
const { REACT_APP_SERVER_URL, REACT_APP_CLIENT_URL } = process.env;

const setRefreshCookie = (refresh) => {
    Cookies.set("refresh", refresh, {
        path: "/",
        expires: 7,
        sameSite: "None",
        secure: true,
        domain: REACT_APP_SERVER_URL
    });

    Cookies.set("x-sign", true, {
        expires: 7,
        path: "/",
        sameSite: "None",
        secure: true,
        domain: REACT_APP_SERVER_URL
    });

    Cookies.set("isLoggedIn", true, {
        path: "/",
        sameSite: "None",
        secure: true,
        domain: REACT_APP_SERVER_URL
    });
};

const setBrowserCookie = (browser) => {
    Cookies.set("browser", browser, {
        expires: 30,
        path: "/",
        sameSite: "None",
        secure: true,
        domain: REACT_APP_SERVER_URL
        // secure: true,
        // domain: ""
    });
};

const clearCookies = () => {
    Cookies.remove("browser");
    Cookies.remove("refresh");
    Cookies.remove("x-sign");
    Cookies.remove("isLoggedIn");
    Cookies.remove("_csrf");
};

export { setRefreshCookie, setBrowserCookie, clearCookies };
