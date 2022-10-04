import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    faSpinner,
    faTimes,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addTodo, toggleTodo, removeTodo } from "../redux/todos/todosThunck";
import { showAllTodos, filterTodos } from "../redux/todos/todos";
import List from "./List";
import Loader from "./Loader";

const NAME_REGEX = /^[A-z][A-z0-9-_ ]{2,127}$/;

const Todos = () => {
    const dispatch = useDispatch();

    const [todo, setTodo] = useState("");
    const [validTodo, setValidTodo] = useState(false);
    const [todoFocus, setTodoFocus] = useState(false);

    const {
        entities: todos,
        showedEntities: showedTodos,
        msg: errMsg,
        loading,
        addLoading,
        addMsg: addErr
    } = useSelector((state) => state.todos);

    const [query, setQuery] = useState("");

    const add = (e) => {
        e.preventDefault();
        if (validTodo) {
            dispatch(addTodo(todo)).then(() => {
                setTodo("");
                dispatch(filterTodos(query));
            });
        }
    };

    const toggle = (id) => {
        dispatch(toggleTodo(id)).then(() => {
            dispatch(filterTodos(query));
        });
    };

    const remove = (id) => {
        dispatch(removeTodo(id)).then(() => {
            dispatch(filterTodos(query));
        });
    };

    const filter = (e) => {
        e.preventDefault();
        dispatch(filterTodos(query));
    };

    const showAll = () => {
        setQuery("");
        dispatch(showAllTodos());
    };

    useEffect(() => {
        document.title = "Todos";
    }, []);

    useEffect(() => {
        setValidTodo(NAME_REGEX.test(todo));
    }, [todo]);

    return (
        <>
            {loading === "loading" ? (
                <Loader />
            ) : (
                <section>
                    <div className="container">
                        <h1>todos</h1>
                        <div className="form-error">
                            {errMsg && <p>{errMsg}</p>}
                        </div>

                        <div className="add-form">
                            <h3>add todo</h3>
                            <form>
                                <div className="mb-3 add-form-row">
                                    <label
                                        for="InputTodo"
                                        className="form-label visually-hidden"
                                    >
                                        Todo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="InputTodo"
                                        aria-describedby="todoHelp"
                                        aria-invalid={validTodo ? false : true}
                                        placeholder="Todo"
                                        value={todo}
                                        onChange={(e) =>
                                            setTodo(e.target.value)
                                        }
                                        onFocus={() => setTodoFocus(true)}
                                        onBlur={() => setTodoFocus(false)}
                                    />
                                </div>

                                <div className="mb-3 add-form-row">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={add}
                                        disabled={validTodo ? false : true}
                                    >
                                        add todo
                                    </button>
                                </div>

                                <div className="mb-3 add-form-row">
                                    <div
                                        id="todoHelp"
                                        className={
                                            todoFocus && todo && !validTodo
                                                ? "sign-up-error"
                                                : "offscreen"
                                        }
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        3 to 127 characters.
                                        <br />
                                        Must begin with a letter.
                                        <br />
                                        Letters, numbers, underscores, hyphens
                                        allowed.
                                    </div>
                                    <div
                                        className={
                                            addLoading === "idle"
                                                ? "form-text form-error"
                                                : "form-text"
                                        }
                                    >
                                        {addLoading === "loading" ? (
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faSpinner}
                                                    className="spinner"
                                                />{" "}
                                                Adding Todo
                                            </>
                                        ) : (
                                            addErr && (
                                                <>
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                    />
                                                    {" " + addErr}
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                            </form>

                            <br />
                            {/* <button className="btn btn-primary" onClick={empty}>
                        empty all
                    </button>
                    <button className="btn btn-primary" onClick={get}>
                        fetch all
                    </button> */}
                        </div>

                        <div className="list">
                            <h3>todos list</h3>
                            <div className="search-form">
                                <form
                                    className="d-flex flex-md-row flex-column mb-3"
                                    role="search"
                                >
                                    <input
                                        className="form-control mb-3 mb-md-0"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={query ? false : true}
                                        onClick={filter}
                                    >
                                        Search
                                    </button>
                                </form>

                                {showedTodos !== todos && (
                                    <div className="mb-3">
                                        <button
                                            className="btn btn-primary"
                                            onClick={showAll}
                                        >
                                            Show all todos
                                        </button>
                                    </div>
                                )}
                            </div>

                            <List
                                items={showedTodos}
                                remove={remove}
                                toggle={toggle}
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Todos;
