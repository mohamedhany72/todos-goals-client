import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

export const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        addGoal: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (name) => {
                const id = nanoid();
                return {
                    payload: { id, name }
                };
            }
        },
        removeGoal: (state, action) => {
            return state.filter((goal) => goal.id !== action.payload);
        },
        emptyGoals: (state) => {
            state.slice(0, state.length);
        }
    }
});

export const { addGoal, removeGoal, emptyGoals } = goalsSlice.actions;
export default goalsSlice.reducer;
