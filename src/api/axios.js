import axios from "axios";
import { getAccess } from "./usersApi";

const { REACT_APP_SERVER_URL, REACT_APP_CLIENT_URL } = process.env;

axios.defaults.baseURL = `${REACT_APP_SERVER_URL}/api`;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
    REACT_APP_CLIENT_URL;
axios.defaults.headers.common["Access-Control-Max-Age"] = 600;
axios.defaults.headers.common["Access-Control-Allow-Methods"] = [
    "POST",
    "GET",
    "PUT",
    "DELETE"
];
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        if (error.response.status === 403 && !refresh) {
            refresh = true;

            const response = await getAccess();

            if (response.status === 200) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.access}`;
                return axios(error.config);
            }
        }
        refresh = false;
        return error;
    }
);

// export default axios.create({
//     baseURL: "http://localhost:3001/api",
//     headers: {
//         "Access-Control-Allow-Origin": "http://localhost:3000"
//     }
// });
