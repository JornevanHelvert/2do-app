import ActionTypes from "../../constants/redux/ActionTypes";
import {
    createTaskInFirestore,
    getTasksFromFirestore, getTasksToManageFromFirestore, removeTaskFromFirestore, updateTaskInFirestore,
    updateTaskStatusInFirestore
} from "../../services/firebase/firestore/firestore.service";
import {
    sendMessageTaskCreated,
    sendMessageTaskDeleted,
    sendMessageTaskStatusUpdated
} from "../../services/firebase/fcm/cloudMessaging.service";

const getTasksSuccess = (tasks) => ({
    type: ActionTypes.GET_ALL_TASKS_FOR_USER,
    tasks
});

const setTaskForDetailSuccess = (task) => ({
    type: ActionTypes.SET_TASK_FOR_DETAIL,
    task
});

const setTaskToEditSuccess = (task) => ({
    type: ActionTypes.SET_TASK_TO_EDIT,
    task
});

const setCreateTaskSuccess = (task) => ({
    type: ActionTypes.NEW_TASK,
    task
});

const getTasksToManageSuccess = (tasks) => ({
    type: ActionTypes.GET_TASKS_TO_MANAGE,
    tasks
});

const taskUpdateSuccess = task => ({
    type: ActionTypes.TASK_UPDATE_SUCCESS,
    task
});

const taskStastusUpdatedSuccess = task => ({
   type: ActionTypes.TASK_STATUS_UPDATED_SUCCESS,
   task
});

const removeTaskSuccess = task => ({
    type: ActionTypes.REMOVE_TASK,
    task
});

export const getTasks = ({user, date}) => async dispatch => {
    try {
        const tasks = await getTasksFromFirestore(user, date);
        dispatch(getTasksSuccess(tasks));
    } catch (e) {
        console.log(e);
    }
};

export const clearTasks = () => async dispatch => {
    try {
        dispatch(getTasksSuccess([]));
    } catch (e) {
        console.log(e);
    }
};

export const getTasksToManage = ({user, date}) => async dispatch => {
    try {
        const tasks = await getTasksToManageFromFirestore(user, date);
        dispatch(getTasksToManageSuccess(tasks));
    } catch (e) {
        console.log(e);
    }
};

export const clearTasksToManage = () => async dispatch => {
    try {
        dispatch(getTasksToManageSuccess([]));
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
        await sendMessageTaskStatusUpdated(task);
        dispatch(taskStastusUpdatedSuccess(task));
    } catch (e) {
        console.log(e);
    }
};

export const createTask = ({receiver, title, description, date, currentUser}) => async dispatch => {
    try {
        const task = await createTaskInFirestore({receiver, title, description, date, currentUser});
        await sendMessageTaskCreated(task);
        dispatch(setCreateTaskSuccess(task));
    } catch (e) {
        throw new Error();
    }
};

export const setTaskToEdit = (task) => async dispatch => {
    try {
        dispatch(setTaskToEditSuccess(task));
    } catch (e) {
        console.log(e);
    }
};

export const updateTask = ({title, description, date, receiver, task}) => async dispatch => {
    try {
        task = await updateTaskInFirestore({title, description, date, receiver, task});
        await dispatch(taskUpdateSuccess(task));
    } catch (e) {
        throw new Error();
    }
};

export const removeTask = (task) => async dispatch => {
    try {
        await removeTaskFromFirestore(task);
        await sendMessageTaskDeleted(task);
        dispatch(removeTaskSuccess(task));
    } catch (e) {
        console.log(e);
    }
};
