import { fetchTodos } from "../redux/todos/todosThunck";
import { getUser } from "../redux/user/userThunck";
import { logInUser, removeUser } from "../redux/user/user";
import { fetchGoals } from "../redux/goals/goalsThunck";
import { emptyGoals } from "../redux/goals/goals";
import { emptyTodos } from "../redux/todos/todos";

export const dispatchIntial = (dispatch) => {
    dispatch(logInUser());
    dispatch(getUser());
    dispatch(fetchTodos());
    dispatch(fetchGoals());
};

export const dispatchEmpty = (dispatch) => {
    dispatch(emptyTodos());
    dispatch(emptyGoals());
    dispatch(removeUser());
};

// export default dispatchIntial;
