import React from "react";
import Header from "../Header";
import Update from "./Update";
import ChangePswd from "./ChangePswd";

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
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
