import React, { useState } from "react";
import Header from "./Header";

import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/user/user";

import { getUser, updateUser } from "../redux/user/userThunck";

import * as UAPI from "../api/usersApi";

const About = () => {
    const user = useSelector((state) => state.user.user);
    const errMsg = useSelector((state) => state.user.msg);
    const dispatch = useDispatch();

    const add = () => {
        let myUser = {
            id: "vbvvhv",
            name: "Mido",
            email: "mido@mido.com",
            gender: 1,
            picurl: "picurl.jpg",
            isVerified: false
        };
        dispatch(addUser(myUser));
    };

    const [csrf, setCsrf] = useState("");
    const getCsrf = async () => {
        const res = await UAPI.getCsrf();
        if (res.success) {
            // console.log(csrf)
            setCsrf(res.csrf);
        }
    };

    const update = () => {
        const name = "Mido Capo";
        const gender = 1;
        const picurl = "new_picurl.jpg";

        dispatch(updateUser({ name, gender, picurl, csrf }));
    };

    const get = () => {
        dispatch(getUser());
    };

    const remove = () => {
        dispatch(removeUser());
    };

    return (
        <>
            <Header />
            <div class="container">
                <div class="about">
                    <h1>about the appp</h1>
                    <div>{errMsg && <p>Error: {errMsg}</p>}</div>
                    <p>
                        <button class="btn btn-primary" onClick={add}>
                            add user
                        </button>

                        <button class="btn btn-primary" onClick={update}>
                            update user
                        </button>

                        <button class="btn btn-primary" onClick={get}>
                            get user
                        </button>

                        <button class="btn btn-primary" onClick={remove}>
                            empty user
                        </button>

                        <button class="btn btn-primary" onClick={getCsrf}>
                            get csrf
                        </button>
                    </p>
                    <p>
                        id: {user.id} <br />
                        name: {user.name} <br />
                        email: {user.email} <br />
                        gender: {user.gender} <br />
                        picurl: {user.picurl} <br />
                        isVerified: {user.isVerified ? "true" : "false"} <br />
                        csrf: {csrf}
                    </p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Excepturi dicta veritatis nulla, autem laboriosam,
                        expedita nobis quos consectetur eius incidunt, pariatur
                        possimus assumenda? Voluptas deleniti, iste sequi magnam
                        autem laudantium!
                    </p>

                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Temporibus libero error repellat. Animi quia
                        ducimus perspiciatis enim reprehenderit iusto voluptate
                        debitis reiciendis laboriosam ab aliquid delectus eaque
                        harum, expedita placeat? Nam corrupti exercitationem
                        quas, modi consequuntur consectetur possimus culpa
                        dolore corporis itaque fugit, nostrum qui nisi. Quo
                        inventore sit dolore ut adipisci possimus deserunt
                        assumenda ducimus earum quos, perferendis et tempora
                        omnis vero aliquid ea distinctio magni eum, facilis
                        vitae totam sed, numquam delectus excepturi! Magnam
                        eaque fuga voluptas architecto at! Itaque laborum
                        quisquam veritatis molestias a iure id, vel totam unde,
                        aut eligendi debitis ipsam doloribus ea, deleniti
                        reiciendis.
                    </p>

                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Impedit eius voluptatum, natus, aliquam ipsa
                        fugiat similique dolores voluptatem rem sapiente
                        laborum, praesentium doloribus fugit neque eum ducimus
                        sed saepe sequi quibusdam autem porro veniam deserunt
                        dicta. Suscipit nostrum maxime hic voluptate, quo quae
                        ea ipsam. Vero necessitatibus ipsa iste neque!
                    </p>
                </div>
            </div>
        </>
    );
};

export default About;
