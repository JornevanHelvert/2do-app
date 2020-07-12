import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    tasks: [],
    taskForDetail: {},
    tasksToManage: []
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
        case ActionTypes.NEW_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        }
        case ActionTypes.GET_TASKS_TO_MANAGE: {
            return {
                ...state,
                tasksToManage: action.tasks
            }
        }
        default:
            return {
                ...state
            }
    }
}
