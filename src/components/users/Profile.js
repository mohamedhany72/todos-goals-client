import React from "react";
import Header from "../Header";
import Update from "./Update";
import ChangePswd from "./ChangePswd";
import Delete from "./Delete";

const Profile = () => {
    return (
        <>
            <Header />
            <section>
                <div class="container">
                    <div class="profile-page">
                        <h1>your profile</h1>

                        <div class="profile-data">
                            <Update />

                            <ChangePswd />

                            <Delete />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
