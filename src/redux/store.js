import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./todos/todos";
import goalsReducer from "./goals/goals";
import userReducer from "./user/user";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        goals: goalsReducer,
        user: userReducer
    }
});
