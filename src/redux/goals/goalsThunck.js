import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/api";

export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
    const response = await API.getGoals();
    return response;
});

export const addGoal = createAsyncThunk("goals/addGoal", async (text) => {
    const response = await API.addGoal(text);
    return response;
});

export const removeGoal = createAsyncThunk("goals/removeGoal", async (id) => {
    const response = await API.removeGoal(id);
    return { goalId: id, ...response };
});
