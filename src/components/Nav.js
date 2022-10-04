import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../api/usersApi";
import { dispatchEmpty } from "../utils/dispatchGroup";

import logo from "../assets/images/logo.png";
import userMalePic from "../assets/images/user_male.png";
import userFemalePic from "../assets/images/user_female.png";
import { setFullPicUrl } from "./users/Update";
// const REACT_APP_BACK_END_ROOT_URL = process.env;
const Nav = () => {
    const dispatch = useDispatch();
    const collapseRef = useRef();
    const logMeOut = async () => {
        const { success } = await logout();
        // console.log(res);
        if (success) {
            dispatchEmpty(dispatch).then(() => {
                collapseRef.current.click();
            });
        }
    };

    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    const user = useSelector((state) => state.user.user);
    return (
        <nav className="navbar sticky-top navbar-expand-lg">
            <div className="container-lg">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    useRef={collapseRef}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0">
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        todos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/goals">
                                        goals
                                    </Link>
                                </li>
                            </>
                        )}

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                about
                            </Link>
                        </li>

                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item sign-in-btn">
                                    <Link
                                        className="btn btn-primary"
                                        to="/login"
                                    >
                                        login
                                    </Link>
                                </li>
                                <li className="nav-item sign-up-btn">
                                    <Link
                                        className="btn btn-primary"
                                        to="/register"
                                    >
                                        register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        className="nav-profile-pic"
                                        crossorigin="anonymous"
                                        src={
                                            user.picurl
                                                ? setFullPicUrl(user.picurl)
                                                : user.gender === 2
                                                ? userFemalePic
                                                : userMalePic
                                        }
                                        alt="name-pic"
                                    />
                                </a>
                                <ul className="dropdown-menu profile-menu">
                                    <li>{user.name}</li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="btn btn-primary profile-btn"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="btn btn-primary"
                                            onClick={logMeOut}
                                        >
                                            logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
