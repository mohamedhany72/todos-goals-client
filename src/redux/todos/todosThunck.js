import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/api";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await API.getTodos();
    return response;
});

export const addTodo = createAsyncThunk(
    "todos/addTodo",
    // async (todo, thunkAPI)=>{}
    async (todo) => {
        const response = await API.addTodo(todo);
        return response;
    }
);

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (id) => {
    const response = await API.toggleTodo(id);
    return response;
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async (id) => {
    const response = await API.removeTodo(id);
    return { todoId: id, ...response };
});
