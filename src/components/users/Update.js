import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    faSpinner,
    faTimes,
    faCheck,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../Loader";
import userMalePic from "../../assets/images/user_male.png";
import userFemalePic from "../../assets/images/user_female.png";
import * as UAPI from "../../api/usersApi";
import { addUser } from "../../redux/user/user";

export const BACK_END_ROOT_URL = "http://localhost:3001";
export const setFullPicUrl = (url) => {
    return `${BACK_END_ROOT_URL}/api/images/${url}`;
};

// import axios from "axios";
const NAME_REGEX = /^[A-z][A-z0-9-_ ]{2,23}$/;

const Update = () => {
    const dispatch = useDispatch();
    const { user, fetchLoading } = useSelector((state) => state.user);

    const [csrf, setCsrf] = useState("");

    const getCsrf = async () => {
        const res = await UAPI.getCsrf();
        if (res.success) {
            setCsrf(res.csrf);
        }
        // else {
        //     alert(res.msg);
        // }
    };

    useEffect(() => {
        getCsrf();
    }, []);

    const nameRef = useRef();
    const [name, setName] = useState(user.name);
    const [validName, setValidName] = useState(user.name ? true : false);
    const [nameFocus, setNameFocus] = useState(false);

    const [gender, setGender] = useState(
        user.gender === 1 ? "male" : user.gender === 2 ? "female" : ""
    );
    const [validGender, setValidGender] = useState(user.gender ? true : false);

    const fileRef = useRef();
    const [picurl, setPicurl] = useState(
        user.picurl ? setFullPicUrl(user.picurl) : null
    );
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [removeChecked, setRemoveChecked] = useState(false);

    const errRef = useRef();
    const [err, setErr] = useState("");

    const [progress, setProgress] = useState(0);
    const [inProgress, setInProgress] = useState(false);

    const [success, setSuccess] = useState(false);
    const successRef = useRef();
    useEffect(() => {
        setName(user.name);
        setGender(
            user.gender === 1 ? "male" : user.gender === 2 ? "female" : ""
        );
        setPicurl(user.picurl ? setFullPicUrl(user.picurl) : null);

        setValidName(user.name ? true : false);
        setValidGender(user.gender ? true : false);
    }, [user]);

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    // validate name
    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name]);

    // validate gender
    useEffect(() => {
        setValidGender(gender === "male" || gender === "female");
    }, [gender]);

    const clickChooseImage = (e) => {
        e.preventDefault();
        fileRef.current.click();
    };

    const cancelChoosedImage = (e) => {
        e.preventDefault();
        setPicurl(user.picurl ? setFullPicUrl(user.picurl) : null);
        setSelectedFiles([]);
        fileRef.current.value = null;
    };

    const onPicurlChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setPicurl(URL.createObjectURL(e.target.files[0]));
            setSelectedFiles(e.target.files);
        }
    };
    const onRemoveCheckChange = () => {
        setRemoveChecked(!removeChecked);
    };

    const setProgressBar = (value) => {
        setProgress(value);
    };

    const onUpdate = async (e) => {
        e.preventDefault();
        // validate name and gender
        const v1 = NAME_REGEX.test(name);
        const v2 = gender === "male" || gender === "female";

        if (!v1 || !v2) {
            setErr("please enter valid data");
            errRef.current.focus();
            return;
        }
        setInProgress(true);
        setErr("");
        setSuccess(false);

        // make form data
        // const formData = new FormData();
        let formData = new FormData();
        formData.append("file", selectedFiles[0]);
        formData.append("name", name);
        formData.append("gender", gender === "male" ? 1 : 2);

        formData.append("remove_pic", removeChecked);
        formData.append("_csrf", csrf);

        const res = await UAPI.update(formData, setProgressBar);

        if (res.success) {
            setInProgress(false);
            dispatch(addUser(res.user));
            setProgress(0);
            setSelectedFiles([]);
            fileRef.current.value = null;
            setSuccess(true);
            successRef.current.focus();
        } else {
            setInProgress(false);
            res.msg.length > 120
                ? setErr("Error updating data")
                : setErr(res.msg);
            errRef.current.focus();
            setProgress(0);
            // return
        }
    };

    return (
        <section>
            {fetchLoading === "loading" ? (
                <Loader />
            ) : (
                <>
                    <form
                        enctype="multipart/form-data"
                        className="mb-5"
                        onSubmit={onUpdate}
                    >
                        <div className="mb-5">
                            <h2>update basic data</h2>
                        </div>
                        <div className="mb-4">
                            <div className="profile-img-big">
                                <img
                                    crossorigin="anonymous"
                                    src={
                                        picurl
                                            ? picurl
                                            : gender === 2
                                            ? userFemalePic
                                            : userMalePic
                                    }
                                    alt={`image of ${name}`}
                                />
                                <input
                                    ref={fileRef}
                                    type="file"
                                    id="pic-file"
                                    className="d-none"
                                    onChange={onPicurlChange}
                                />
                                <div>
                                    <div className="mb-3 d-flex flex-column flex-md-row">
                                        <button
                                            className={
                                                picurl !==
                                                setFullPicUrl(user.picurl)
                                                    ? "btn btn-primary me-0 me-md-3 mb-2 mb-md-0"
                                                    : "btn btn-primary me-0 mb-0"
                                            }
                                            role="input"
                                            type="button"
                                            onClick={clickChooseImage}
                                        >
                                            choose image
                                        </button>
                                        {picurl !==
                                            setFullPicUrl(user.picurl) && (
                                            <button
                                                className="btn btn-primary"
                                                role="input"
                                                type="button"
                                                onClick={cancelChoosedImage}
                                            >
                                                reset image
                                            </button>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            className="me-2"
                                            type="checkbox"
                                            id="remove-pic"
                                            checked={removeChecked}
                                            onChange={onRemoveCheckChange}
                                        />
                                        <label htmlFor="remove-pic">
                                            {" "}
                                            Remove Pic
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 text-start">
                            <label htmlFor="name" className="mb-2">
                                Name:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validName ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validName || !name ? "hide" : "invalid"
                                    }
                                />
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                name="name"
                                id="name"
                                placeholder="name"
                                aria-describedby="nameHelp"
                                aria-invalid={validName ? true : false}
                                required
                                ref={nameRef}
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                            />
                            <div
                                id="nameHelp"
                                className={
                                    nameFocus && name && !validName
                                        ? "sign-up-error"
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                3 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </div>
                        </div>
                        <div className="mb-4 text-start">
                            <label htmlFor="select" className="mb-2">
                                Select your gender:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validGender ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={validGender ? "hide" : "invalid"}
                                />
                            </label>
                            <select
                                id="select"
                                className="form-select"
                                // aria-label="Select your gender"
                                aria-invalid={validGender ? false : true}
                                aria-describedby="selectHelp"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="">Choose Your Gender</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                for="signInInputEmail"
                                className="form-label mb-2"
                            >
                                Email address:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validGender ? "valid" : "hide"}
                                />
                            </label>
                            <input
                                value={user.email}
                                disabled
                                type="email"
                                className="form-control"
                                id="signInInputEmail"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="btn btn-primary">
                                update
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
                            className={err ? "mb-4 form-error" : "d-none"}
                            ref={errRef}
                        >
                            {err}
                        </div>
                        {inProgress && (
                            <div className="mb-4 myProgress">
                                <label
                                    htmlFor="progress"
                                    className="me-1 success"
                                >
                                    {progress}%{" "}
                                </label>
                                <progress
                                    id="progress"
                                    value={progress}
                                    max="100"
                                >
                                    {progress}%
                                </progress>
                            </div>
                        )}
                    </form>

                    <div
                        className={success ? "mb-2 success" : "d-none"}
                        ref={successRef}
                    >
                        User updated successfully
                    </div>

                    <hr />
                </>
            )}
        </section>
    );
};

export default Update;
