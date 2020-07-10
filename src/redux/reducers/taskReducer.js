import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    tasks: [],
    taskForDetail: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL_TASKS_FOR_USER: {
            return {
                ...state,
                tasks: [...action.tasks]
            }
        }
        case ActionTypes.SET_TASK_FOR_DETAIL: {
            return {
                ...state,
                taskForDetail: action.task
            }
        }
        default:
            return {
                ...state
            }
    }
}
