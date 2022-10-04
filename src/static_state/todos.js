import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (name) => {
                const id = nanoid();
                const complete = false;
                return { payload: { id, name, complete } };
            }
        },
        toggleTodo: (state, action) => {
            return state.map((todo) =>
                todo.id !== action.payload
                    ? todo
                    : Object.assign({}, todo, { complete: !todo.complete })
            );
        },
        removeTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
        emptyTodos: (state) => {
            state.splice(0, state.length);
        }
    }
});

export const { addTodo, toggleTodo, removeTodo, emptyTodos } =
    todosSlice.actions;
export default todosSlice.reducer;
