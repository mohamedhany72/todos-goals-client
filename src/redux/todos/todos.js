import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, addTodo, toggleTodo, removeTodo } from "./todosThunck";

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

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        filterTodos: (state, action) => {
            state.showedEntities =
                action.payload === ""
                    ? state.entities
                    : state.entities.filter((t) =>
                          t.name
                              .toLowerCase()
                              .includes(action.payload.toLowerCase())
                      );
        },
        showAllTodos: (state) => {
            state.showedEntities = state.entities;
        },
        emptyTodos: (state) => {
            // eslint-disable-next-line
            return (state = initialState);
        }
    },
    extraReducers: (builder) => {
        // fetch todos
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = loading;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = idle;
            if (action.payload.success) {
                state.entities = action.payload.todos;
                state.showedEntities = action.payload.todos;
                state.msg = "";
            } else {
                state.msg = action.payload.msg;
            }
        });

        // add todo
        builder.addCase(addTodo.pending, (state) => {
            state.addLoading = loading;
            state.addMsg = "";
        });
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.addLoading = idle;
            if (action.payload.success) {
                state.entities.push(action.payload.todo);
                state.addMsg = "";
            } else {
                state.addMsg = action.payload.msg;
            }
        });

        // toggle todo
        builder.addCase(toggleTodo.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.entities = state.entities.map((todo) =>
                    todo.id !== action.payload.todo.id
                        ? todo
                        : action.payload.todo
                );
                state.msg = "";
            } else {
                state.msg = action.payload.msg;
            }
        });

        // remove todo
        builder.addCase(removeTodo.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.entities = state.entities.filter(
                    (todo) => todo.id !== action.payload.todoId
                );
                state.msg = "";
            } else {
                state.msg = action.payload.todoId;
            }
        });
    }
});

export const { filterTodos, showAllTodos, emptyTodos } = todosSlice.actions;
export default todosSlice.reducer;
