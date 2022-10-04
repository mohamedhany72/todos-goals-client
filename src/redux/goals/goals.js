import { createSlice } from "@reduxjs/toolkit";
import { fetchGoals, addGoal, removeGoal } from "./goalsThunck";

const loading = "loading";
const idle = "idle";

const initialState = {
    entities: [],
    showedEntities: [],
    loading: idle,
    addLoading: idle,
    msg: "",
    addMsg: ""
};

export const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        filterGoals: (state, action) => {
            state.showedEntities =
                action.payload === ""
                    ? state.entities
                    : state.entities.filter((g) =>
                          g.name
                              .toLowerCase()
                              .includes(action.payload.toLowerCase())
                      );
        },
        showAllGoals: (state) => {
            state.showedEntities = state.entities;
        },
        emptyGoals: (state) => {
            // eslint-disable-next-line
            return (state = initialState);
        }
    },
    extraReducers: (builder) => {
        // fetch goals
        builder.addCase(fetchGoals.pending, (state) => {
            state.loading = loading;
        });
        builder.addCase(fetchGoals.fulfilled, (state, action) => {
            state.loading = idle;
            if (action.payload.success) {
                state.entities = action.payload.goals;
                state.msg = "";
            } else {
                state.msg = action.payload.msg;
            }
        });

        // add goal
        builder.addCase(addGoal.pending, (state) => {
            state.addLoading = loading;
            state.addMsg = "";
        });
        builder.addCase(addGoal.fulfilled, (state, action) => {
            state.addLoading = idle;
            if (action.payload.success) {
                state.entities.push(action.payload.goal);
                state.addMsg = "";
            } else {
                state.addMsg = action.payload.msg;
            }
        });

        // remove goal
        builder.addCase(removeGoal.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.entities = state.entities.filter(
                    (goal) => goal.id !== action.payload.goalId
                );
                state.addMsg = "";
            } else {
                state.addMsg = action.payload.msg;
            }
        });
    }
});

export const { showAllGoals, filterGoals, emptyGoals } = goalsSlice.actions;
export default goalsSlice.reducer;
