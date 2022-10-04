import axios from "axios";
import { handleErr } from "./usersApi";

const TODOS_URL = "/todos";
const GOALS_URL = "/goals";

const success = true;

const destructure_todo = (oldTodo) => {
    const todo = (({ id, todo: name, complete, date }) => ({
        id,
        name,
        complete,
        date
    }))(oldTodo);
    return todo;
};

const destructure_goal = (oldGoal) => {
    const goal = (({ id, goal: name, complete, date }) => ({
        id,
        name,
        complete,
        date
    }))(oldGoal);
    return goal;
};

// todos
const getTodos = async () => {
    const res = await axios.get(TODOS_URL);
    if (res.message) {
        return handleErr(res);
    }
    const todos = res?.data?.todos.map(
        ({ id, todo: name, complete, date }) => ({
            id,
            name,
            complete,
            date
        })
    );
    return {
        success,
        todos
    };
};

const addTodo = async (text) => {
    const res = await axios.post(TODOS_URL, JSON.stringify({ todo: text }), {
        headers: { "Content-Type": "application/json" }
    });

    if (res.message) {
        return handleErr(res);
    }

    const todo = destructure_todo(res?.data?.todo);
    return {
        success,
        todo
    };
};

const toggleTodo = async (id) => {
    const res = await axios.put(TODOS_URL, JSON.stringify({ id }), {
        headers: { "Content-Type": "application/json" }
    });

    if (res.message) {
        return handleErr(res);
    }
    const todo = destructure_todo(res?.data?.todo);
    return {
        success,
        todo
    };
};

const removeTodo = async (id) => {
    const res = await axios.delete(`${TODOS_URL}/${id}`);

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        msg: res?.data
    };
};

// goals
const getGoals = async () => {
    const res = await axios.get(GOALS_URL);
    if (res.message) {
        return handleErr(res);
    }
    const goals = res?.data?.goals.map(({ id, goal: name, date }) => ({
        id,
        name,
        date
    }));
    return {
        success,
        goals
    };
};

const addGoal = async (text) => {
    const res = await axios.post(GOALS_URL, JSON.stringify({ goal: text }), {
        headers: { "Content-Type": "application/json" }
    });
    if (res.message) {
        return handleErr(res);
    }
    const goal = destructure_goal(res?.data?.goal);
    return {
        success,
        goal
    };
};

const removeGoal = async (id) => {
    const res = await axios.delete(`${GOALS_URL}/${id}`);

    if (res.message) {
        return handleErr(res);
    }

    return {
        success,
        msg: res?.data
    };
};

export {
    getTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    getGoals,
    addGoal,
    removeGoal
};
