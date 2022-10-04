import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import notFoundImg from "../assets/images/404_img.png";

const NotFound = () => {
    return (
        <>
            <Header />
            <div class="container">
                <div class="error-page">
                    <img src={notFoundImg} alt="404 page not found" />
                    <h2>
                        <Link class="nav-link" to="/">
                            Go back
                        </Link>
                    </h2>
                </div>
            </div>
        </>
    );
};

export default NotFound;
