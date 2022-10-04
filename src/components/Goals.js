import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGoal, removeGoal } from "../redux/goals/goalsThunck";
import { showAllGoals, filterGoals } from "../redux/goals/goals";
import {
    faSpinner,
    faTimes,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import List from "./List";
import Loader from "./Loader";

const NAME_REGEX = /^[A-z][A-z0-9-_ ]{2,127}$/;

const Goals = () => {
    const dispatch = useDispatch();

    const [goal, setGoal] = useState("");
    const [validGoal, setValidGoal] = useState(false);
    const [goalFocus, setGoalFocus] = useState(false);

    const {
        entities: goals,
        showedEntities: showedGoals,
        msg: errMsg,
        loading,
        addLoading,
        addMsg: addErr
    } = useSelector((state) => state.goals);

    const [query, setQuery] = useState("");

    const add = (e) => {
        e.preventDefault();
        if (validGoal) {
            dispatch(addGoal(goal)).then(() => {
                setGoal("");
                dispatch(filterGoals(query));
            });
        }
    };

    const remove = (id) => {
        dispatch(removeGoal(id)).then(() => {
            dispatch(filterGoals(query));
        });
    };

    const filter = (e) => {
        e.preventDefault();
        dispatch(filterGoals(query));
    };

    const showAll = () => {
        setQuery("");
        dispatch(showAllGoals());
    };

    useEffect(() => {
        document.title = "Goals";
    }, []);

    useEffect(() => {
        setValidGoal(NAME_REGEX.test(goal));
    }, [goal]);

    return (
        <>
            {loading === "loading" ? (
                <Loader />
            ) : (
                <section>
                    <div class="container">
                        <h1>goals</h1>
                        <div>{errMsg && <p>{errMsg}</p>}</div>
                        <div class="add-form">
                            <h3>add goal</h3>
                            <form>
                                <div class="mb-3 add-form-row">
                                    <label
                                        for="InputGoal"
                                        class="form-label visually-hidden"
                                    >
                                        Goal
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="InputGoal"
                                        aria-describedby="goalHelp"
                                        aria-invalid={validGoal ? false : true}
                                        placeholder="Goal"
                                        value={goal}
                                        onChange={(e) =>
                                            setGoal(e.target.value)
                                        }
                                        onFocus={() => setGoalFocus(true)}
                                        onBlur={() => setGoalFocus(false)}
                                    />
                                </div>
                                <div class="mb-3 add-form-row">
                                    <button
                                        class="btn btn-primary"
                                        type="submit"
                                        onClick={add}
                                        disabled={validGoal ? false : true}
                                    >
                                        add goal
                                    </button>
                                </div>
                                <div className="mb-3 add-form-row">
                                    <div
                                        id="goalHelp"
                                        className={
                                            goalFocus && goal && !validGoal
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
                                                Adding Goal
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
                        </div>

                        <div class="list">
                            <h3>goals list</h3>
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

                                {showedGoals !== goals && (
                                    <div className="mb-3">
                                        <button
                                            className="btn btn-primary"
                                            onClick={showAll}
                                        >
                                            Show all goals
                                        </button>
                                    </div>
                                )}
                            </div>

                            <List items={showedGoals} remove={remove} />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Goals;
