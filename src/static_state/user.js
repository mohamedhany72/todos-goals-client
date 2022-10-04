import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    name: "",
    email: "",
    gender: null,
    picurl: null,
    isVerified: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: {
            reducer: (state, action) => {
                return (state = action.payload);
            },
            prepare: (user) => {
                const id = nanoid();
                return { payload: { id, ...user } };
            }
        },
        updateUser: (state, action) => {
            state.name = action.payload.name;
            state.gender = action.payload.gender;
            state.picurl = action.payload.picurl;
        },
        verifyUser: (state) => {
            state.isVerified = true;
        },
        removeUser: (state) => {
            // eslint-disable-next-line
            return (state = initialState);
        }
    }
});

export const { addUser, updateUser, verifyUser, removeUser } =
    userSlice.actions;
export default userSlice.reducer;
