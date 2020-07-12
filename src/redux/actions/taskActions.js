import ActionTypes from "../../constants/redux/ActionTypes";
import {
    createTaskInFirestore,
    getTasksFromFirestore,
    updateTaskStatusInFirestore
} from "../../services/firebase/firestore/firestore.service";

const getTasksSuccess = (tasks) => ({
    type: ActionTypes.GET_ALL_TASKS_FOR_USER,
    tasks
});

const setTaskForDetailSuccess = (task) => ({
    type: ActionTypes.SET_TASK_FOR_DETAIL,
    task
});

const setCreateTaskSuccess = (task) => ({
    type: ActionTypes.NEW_TASK,
    task
});

export const getTasks = (user) => async dispatch => {
    try {
        const tasks = await getTasksFromFirestore(user);
        dispatch(getTasksSuccess(tasks));
    } catch (e) {
        console.log(e);
    }
};

export const setTaskForDetail = (task) => async dispatch => {
    try {
        dispatch(setTaskForDetailSuccess(task));
    } catch (e) {
        console.log(e);
    }
};

export const updateTaskStatus = (task) => async dispatch => {
    try {
        await updateTaskStatusInFirestore(task);
        task = {...task, isDone: !task.isDone};
        dispatch(setTaskForDetailSuccess(task));
    } catch (e) {
        console.log(e);
    }
};

export const createTask = ({receiver, title, description, date, currentUser}) => async dispatch => {
    try {
        const task = await createTaskInFirestore({receiver, title, description, date, currentUser});
        dispatch(setCreateTaskSuccess(task));
    } catch (e) {
        console.log(e);
    }
}
;
