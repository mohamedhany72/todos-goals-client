import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./todos";
import goalsReducer from "./goals";
import userReducer from "./user";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        goals: goalsReducer,
        user: userReducer
    }
});
