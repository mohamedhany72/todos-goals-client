import React, { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    faCheck,
    faTimes,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import validator from "email-validator";
import schema from "../../utils/schema";
import Header from "../Header";
import { register } from "../../api/usersApi";
import { addUser, logInUser } from "../../redux/user/user";

const NAME_REGEX = /^[A-z][A-z0-9-_ ]{2,23}$/;

const Register = () => {
    const dispatch = useDispatch();

    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [gender, setGender] = useState("");
    const [validGender, setValidGender] = useState(false);
    // const [genderFocus, setgenderFocus] = useState(false);

    const [pswd, setPswd] = useState("");
    const [validPswd, setValidPswd] = useState(false);
    const [pswdFocus, setPswdFocus] = useState(false);

    const [cpswd, setCpswd] = useState("");
    const [validCpswd, setValidCpswd] = useState(false);
    const [cpswdFocus, setCpswdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [navigate, setNavigate] = useState(false);

    // use useEffect to validate each field
    useEffect(() => {
        nameRef.current.focus();
    }, []);

    // validate name
    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name]);

    // validate email
    useEffect(() => {
        setValidEmail(validator.validate(email));
    }, [email]);

    // validate gender
    useEffect(() => {
        setValidGender(gender === "male" || gender === "female");
    }, [gender]);

    // validate pswd & cpswd
    useEffect(() => {
        setValidPswd(schema.validate(pswd));
        setValidCpswd(pswd === cpswd);
    }, [pswd, cpswd]);

    // reset error msg
    useEffect(() => {
        setErrMsg("");
    }, [name, email, gender, pswd, cpswd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = NAME_REGEX.test(name);
        const v2 = validator.validate(email);
        const v3 = gender === "male" || gender === "female";
        const v4 = schema.validate(pswd);
        const v5 = pswd === cpswd;
        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("Invalid Entry");
            return;
        }
        let numGender;
        gender === "male" ? (numGender = 1) : (numGender = 2);

        const res = await register(name, email, numGender, pswd, cpswd);

        if (!res.success) {
            setErrMsg(res.msg);
            errRef.current.focus();
        }

        setName("");
        setEmail("");
        setGender("");
        setPswd("");
        setCpswd("");
        dispatch(addUser(res.user));
        dispatch(logInUser());
        setNavigate(true);
    };

    if (navigate) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <div className="sign-up-page">
                        <h1>signup</h1>
                        <div className="sign-up-form">
                            <form onSubmit={handleSubmit}>
                                {/* name field*/}
                                <div className="mb-3">
                                    <label htmlFor="name">
                                        Name:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={
                                                validName ? "valid" : "hide"
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={
                                                validName || !name
                                                    ? "hide"
                                                    : "invalid"
                                            }
                                        />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        ref={nameRef}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        placeholder="name"
                                        aria-describedby="nameHelp"
                                        aria-invalid={validName ? false : true}
                                        required
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
                                        Letters, numbers, underscores, hyphens
                                        allowed.
                                    </div>
                                </div>

                                {/* email */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="signInInputEmail"
                                        className="form-label"
                                    >
                                        Email address:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={
                                                validEmail ? "valid" : "hide"
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={
                                                validEmail || !email
                                                    ? "hide"
                                                    : "invalid"
                                            }
                                        />
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="signInInputEmail"
                                        aria-describedby="emailHelp"
                                        aria-invalid={validEmail ? false : true}
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        required
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <div
                                        id="emailHelp"
                                        className={
                                            emailFocus && email && !validEmail
                                                ? "sign-up-error"
                                                : "offscreen"
                                        }
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        consists of an email prefix to the left
                                        of the @ symbol <br />
                                        and an email domain to the right of the
                                        @ symbol, <br />
                                        both in acceptable formats. <br />
                                    </div>
                                </div>

                                {/* gender */}
                                <div className="mb-3">
                                    <label htmlFor="select">
                                        Select your gender:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={
                                                validGender ? "valid" : "hide"
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={
                                                validGender || !gender
                                                    ? "hide"
                                                    : "invalid"
                                            }
                                        />
                                    </label>
                                    <select
                                        id="select"
                                        className="form-select"
                                        // aria-label="Select your gender"
                                        aria-invalid={
                                            validGender ? false : true
                                        }
                                        aria-describedby="selectHelp"
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Choose Your Gender
                                        </option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </select>
                                    <div
                                        id="selectHelp"
                                        className="visually-hidden"
                                    >
                                        Gender must be male or female
                                    </div>
                                </div>

                                {/* password */}
                                <div className="mb-3">
                                    <label htmlFor="signInInputPassword">
                                        Password:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={
                                                validPswd ? "valid" : "hide"
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={
                                                validPswd || !pswd
                                                    ? "hide"
                                                    : "invalid"
                                            }
                                        />
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="signInInputPassword"
                                        aria-describedby="passwordHelp"
                                        aria-invalid={validPswd ? false : true}
                                        placeholder="Password"
                                        value={pswd}
                                        onChange={(e) =>
                                            setPswd(e.target.value)
                                        }
                                        onFocus={() => setPswdFocus(true)}
                                        onBlur={() => setPswdFocus(false)}
                                        required
                                    />
                                    <div
                                        id="passwordHelp"
                                        className={
                                            pswdFocus && pswd && !validPswd
                                                ? "sign-up-error"
                                                : "offscreen"
                                        }
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.
                                        <br />
                                        Must include uppercase and lowercase
                                        letters, a number and a special
                                        character.
                                        <br />
                                    </div>
                                </div>

                                {/* confirm password */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label"
                                    >
                                        Confirm Password:
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className={
                                                validCpswd && cpswd
                                                    ? "valid"
                                                    : "hide"
                                            }
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className={
                                                validCpswd || !cpswd
                                                    ? "hide"
                                                    : "invalid"
                                            }
                                        />
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        aria-describedby="confirmPasswordHelp"
                                        aria-invalid={validCpswd ? false : true}
                                        placeholder="Confirm Password"
                                        value={cpswd}
                                        onChange={(e) =>
                                            setCpswd(e.target.value)
                                        }
                                        onFocus={() => setCpswdFocus(true)}
                                        onBlur={() => setCpswdFocus(false)}
                                        required
                                    />
                                    <div
                                        id="confirmPasswordHelp"
                                        className={
                                            cpswdFocus && cpswd && !validCpswd
                                                ? "sign-up-error"
                                                : "offscreen"
                                        }
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        passwords must match
                                    </div>
                                </div>

                                {/* submit btn */}
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-3"
                                    disabled={
                                        !validName ||
                                        !validPswd ||
                                        !validEmail ||
                                        !validGender ||
                                        !validCpswd
                                            ? true
                                            : false
                                    }
                                >
                                    sign up
                                </button>

                                <p
                                    ref={errRef}
                                    aria-live="assertive"
                                    className={
                                        errMsg ? "sign-up-error" : "hidden"
                                    }
                                >
                                    {errMsg}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
