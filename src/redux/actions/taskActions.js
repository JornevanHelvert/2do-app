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
import {dateToShow} from "../../constants/dateSelector/dateToShow";

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

const taskStatusUpdatedSuccess = task => ({
   type: ActionTypes.TASK_STATUS_UPDATED_SUCCESS,
   task
});

const removeTaskSuccess = task => ({
    type: ActionTypes.REMOVE_TASK,
    task
});

const setUpdateTaskDay = day => ({
    type: ActionTypes.UPDATE_TASK_DAY,
    day
});

const setUpdateTaskToManageDay = day => ({
    type: ActionTypes.UPDATE_TASK_TO_MANAGE_DAY,
    day
});

export const getTasks = ({user, date}) => async dispatch => {
    try {
        const tasks = await getTasksFromFirestore(user, date);
        dispatch(getTasksSuccess(tasks));
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
        dispatch(taskStatusUpdatedSuccess(task));
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
        console.log(e);
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
        console.log(e);
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

export const updateTaskDay = ({currentDay, daysToAdd}) => async dispatch => {
    try {
        let index = dateToShow.indexOf(currentDay);

        if ((index < dateToShow.length - 1 || daysToAdd < 0) && (index > 0 || daysToAdd > 0)) {
            dispatch(getTasksSuccess([]));
            index += daysToAdd;
            const date = dateToShow[index];
            dispatch(setUpdateTaskDay(date));
        }
    } catch (e) {
        console.log(e);
    }
};

export const updateTaskToManageDay = ({currentDay, daysToAdd}) => async dispatch => {
    try {
        let index = dateToShow.indexOf(currentDay);

        if ((index < dateToShow.length - 1 || daysToAdd < 0) && (index > 0 || daysToAdd > 0)) {
            dispatch(getTasksToManageSuccess([]));
            index += daysToAdd;
            const date = dateToShow[index];
            dispatch(setUpdateTaskToManageDay(date));
        }
    } catch (e) {
        console.log(e);
    }
};
