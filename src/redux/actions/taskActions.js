import {db} from "../../constants/firebase/firebase";
import QueryConstants from "../../constants/firebase/queryConstants";
import ActionTypes from "../../constants/redux/ActionTypes";

const getTasksSuccess = (tasks) => ({
    type: ActionTypes.GET_ALL_TASKS_FOR_USER,
    tasks
});

const setTaskForDetailSuccess = (task) => ({
    type: ActionTypes.SET_TASK_FOR_DETAIL,
    task
});

export const getTasks = (user) => async dispatch => {
    try {
        const snapshot = await db.collection(QueryConstants.TASKS_COLLECTION)
            .where(QueryConstants.RECEIVER_FIELD, '==', user.toLowerCase())
            .get();

        const tasks = [];

        await snapshot.forEach(t => {
            const task = {
                ...t.data(),
                CreationDate: new Date(t.data().CreationDate * 1000),
                DueDate: new Date(t.data().DueDate * 1000),
            };
            tasks.push(task);
        });

        if (tasks.length === 0) {
            tasks.push('Er zijn nog geen taken voor jou')
        }

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
