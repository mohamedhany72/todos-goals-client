import { createAsyncThunk } from "@reduxjs/toolkit";
import * as UAPI from "../../api/usersApi";

// getuser
export const getUser = createAsyncThunk("user/getUser", async () => {
    const response = await UAPI.getUser();
    return response;
});

// edit
export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
    const response = await UAPI.update(
        user.name,
        user.gender,
        user.picurl,
        user.csrf
    );
    return response;
});
