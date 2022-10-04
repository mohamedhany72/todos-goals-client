import { createSlice } from "@reduxjs/toolkit";
import { getUser, updateUser } from "./userThunck";

const loading = "loading";
const idle = "idle";

const initialState = {
    loggedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
        gender: null,
        picurl: null,
        isVerified: null
    },
    fetchLoading: idle,
    updateLoading: idle,
    msg: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logInUser: (state) => {
            state.loggedIn = true;
        },
        addUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            // eslint-disable-next-line
            return (state = initialState);
        }
    },
    extraReducers: (builder) => {
        // get User
        builder.addCase(getUser.pending, (state) => {
            state.fetchLoading = loading;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.fetchLoading = idle;
            if (action.payload.success) {
                state.user = action.payload.user;
                // state.loggedIn = true;
                state.msg = "";
            }
            // else {
            //     state.msg = action.payload.msg;
            // }
        });
        // update user
        builder.addCase(updateUser.pending, (state) => {
            state.updateLoading = loading;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.updateLoading = idle;
            if (action.payload.success) {
                state.user = action.payload.user;
                state.msg = "";
            } else {
                state.msg = action.payload.msg;
            }
        });
    }
});

export const { logInUser, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
