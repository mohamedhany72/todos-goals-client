import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./users/Register";
import Login from "./users/Login";
import Profile from "./users/Profile";
import Recover from "./users/Recover";
import Forget from "./users/Forget";
import Nav from "./Nav";
import Todos from "./Todos";
import About from "./About";
import Goals from "./Goals";
import Footer from "./Footer";
import NotFound from "./NotFound";
import Cookies from "js-cookie";
import RequireLogin from "./RequireLogin";
import RequireLogOut from "./RequireLogOut";
import RecoverParam from "./users/RecoverParam";
import VerifyUser from "./users/VerifyUser";
import Loader from "./Loader";

import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/todos/todosThunck";
import { addUser, logInUser } from "../redux/user/user";
import { fetchGoals } from "../redux/goals/goalsThunck";

import * as UAPI from "../api/usersApi";

import { dispatchIntial } from "../utils/dispatchGroup";

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [getRefresh, setGetRefresh] = useState(false);
    // const [loading, setLoading] = useState(false);
    const loadUser = useSelector((state) => state.user.fetchLoading);
    // const loadTodos =

    const getRefreshFunc = async () => {
        const response = await UAPI.refresh();

        if (response.success) {
            // dispatch actions
            dispatch(fetchTodos());
            dispatch(logInUser());
            dispatch(addUser(response.user));
            dispatch(fetchGoals());
        }
        setLoading(false);
        // else {
        //     setErr(response.msg);
        // }
    };

    const getAccessFunc = async () => {
        const { success } = await UAPI.getAccess();
        if (success) {
            dispatchIntial(dispatch);
        }
        setLoading(false);
    };

    useEffect(() => {
        const xSign = Cookies.get("x-sign");
        const loggedIn = Cookies.get("isLoggedIn");

        if (xSign && loggedIn) {
            // just get access
            // dispatchIntial(dispatch);
            getAccessFunc();
        } else if (xSign) {
            // get refresh token
            setGetRefresh(true);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (getRefresh) {
            getRefreshFunc();
        }
    }, [getRefresh]);
    //
    return (
        <>
            <Nav />
            {loadUser === "loading" || loading ? (
                <Loader />
            ) : (
                <main>
                    <Routes>
                        <Route path="/verify/:code" element={<VerifyUser />} />
                        <Route path="/recover" element={<Recover />} />
                        <Route
                            path="/recover/:code"
                            element={<RecoverParam />}
                        />
                        {/* <Route path=":code" element={<RecoverParam />}/>
                        <Route index element={<RecoverForm />}/> */}
                        {/* </Route> */}

                        <Route path="/forget" element={<Forget />} />
                        <Route path="*" element={<NotFound />} />

                        <Route path="/about" element={<About />} />
                        <Route element={<RequireLogOut />}>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Route>

                        <Route element={<RequireLogin />}>
                            <Route path="/" element={<Todos />} />
                            <Route path="/goals" element={<Goals />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </main>
            )}
            <Footer />
        </>
    );
}

export default App;
