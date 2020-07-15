import ActionTypes from "../../constants/redux/ActionTypes";
import {dateToShow} from "../../constants/dateSelector/dateToShow";

const initialState = {
    tasks: [],
    taskForDetail: {},
    tasksToManage: [],
    taskToEdit: {},
    taskDay: dateToShow[5],
    taskToManageDay: dateToShow[5]
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
        case ActionTypes.SET_TASK_TO_EDIT: {
            return {
                ...state,
                taskToEdit: action.task
            }
        }
        case ActionTypes.TASK_UPDATE_SUCCESS: {
            return {
                ...state,
                taskToEdit: action.task,
                tasksToManage: state.tasks.map(t => t.id === action.task.id? action.task : t)
            }
        }
        case ActionTypes.TASK_STATUS_UPDATED_SUCCESS: {
            return {
                ...state,
                taskForDetail: action.task,
                tasks: state.tasks.map(t => t.id === action.task.id? action.task : t)
            }
        }
        case ActionTypes.REMOVE_TASK: {
            return {
                ...state,
                taskToEdit: {},
                tasksToManage: state.tasksToManage.filter(t => t.id !== action.task.id)
            }
        }
        case ActionTypes.UPDATE_TASK_DAY: {
            return {
                ...state,
                taskDay: action.day
            }
        }
        case ActionTypes.UPDATE_TASK_TO_MANAGE_DAY: {
            return {
                ...state,
                taskToManageDay: action.day
            }
        }
        default:
            return {
                ...state
            }
    }
}
