import * as firebase from "firebase";
import QueryConstants from "../../../constants/firebase/queryConstants";
import {calculateDate} from "../../../constants/dateSelector/dateToShow";

const db = firebase.firestore();

const getTasks = async (date) => {
    date.setHours(0, 0, 0, 0);

    const snapshot = await db.collection(QueryConstants.TASKS_COLLECTION)
        .where(QueryConstants.DUE_DATE_FIELD, '==', date.getTime())
        .limit(20)
        .get();

    const tasks = [];

    await snapshot.forEach(t => {
        const task = {
            ...t.data(),
            id: t.id
        };
        tasks.push(task);
    });

    return tasks;
};

export const getTasksFromFirestore = async (user, date) => {
    await removeOldTasks();
    const tasks = (
        await getTasks(date.value)
    ).filter(t => t.Receiver === user);

    if (tasks.length === 0) {
        tasks.push(getEmptyTasksMessage(date));
        return tasks;
    }

    return tasks;
};

export const getTasksToManageFromFirestore = async (user, date) => {
    const tasks = (
        await getTasks(date.value)
    ).filter(t => t.Creator === user);

    if (tasks.length === 0) {
        tasks.push(getEmptyTaskToManageMessage(date));
        return tasks;
    }

    return tasks
};

export const updateTaskStatusInFirestore = async (task) => {
    await db.collection(QueryConstants.TASKS_COLLECTION)
        .doc(task.id)
        .set({
            isDone: !task.isDone
        }, {merge: true});
};

export const writeFcmTokenToDb = async ({user, token}) => {
    await db.collection(QueryConstants.TOKEN_COLLECTION)
        .doc(user)
        .set({
            token
        }, {merge: true})
};

export const getReceiverToken = async (receiver) => (
    await db.collection(QueryConstants.TOKEN_COLLECTION).doc(receiver).get()
).data().token;

export const getUsersFromFirestore = async () => {
    const snapshot = await db.collection(QueryConstants.USERS_COLLECTION).get();

    const users = [];

    snapshot.forEach(u => {
        const user = {
            ...u.data(),
            id: u.id
        };

        users.push(user);
    });

    return users.sort((u1, u2) => {
        if (u1.nickname < u2.nickname) {
            return -1;
        }
        return 0;
    });
};

export const createTaskInFirestore = async ({receiver, title, description, date, currentUser}) => {
    date.setHours(0, 0, 0, 0);
    if (!receiver || !title || !date || !currentUser || date.getTime() < calculateDate(0).getTime()) {
        throw new Error();
    }

    const task = {
        CreationDate: Date.now(),
        Creator: currentUser,
        Description: description,
        DueDate: date.getTime(),
        Receiver: receiver,
        Title: title,
        isDone: false
    };

    await db.collection(QueryConstants.TASKS_COLLECTION).doc().set(task);

    return task;
};

export const updateTaskInFirestore = async ({receiver, title, description, date, task}) => {
    date.setHours(0, 0, 0, 0);
    if (!receiver || !title || !date || date.getTime() < calculateDate(0).getTime()) {
        throw new Error();
    }

    task = {
        ...task,
        Description: description,
        DueDate: date.getTime(),
        Receiver: receiver,
        Title: title,
    };

    await db.collection(QueryConstants.TASKS_COLLECTION).doc(task.id).set(task);

    return task;
};

export const removeTaskFromFirestore = async (task) => db.collection(QueryConstants.TASKS_COLLECTION).doc(task.id).delete();

const removeOldTasks = async () => {
    const today = calculateDate(-5);

    const lastRemoveDate = (
        await db.collection(QueryConstants.TASKS_COLLECTION).doc(QueryConstants.LAST_REMOVE_DATE).get()
    ).data().date;

    if (lastRemoveDate && today.getTime() !== lastRemoveDate) {
        const snapshot = await db.collection(QueryConstants.TASKS_COLLECTION)
            .where(QueryConstants.DUE_DATE_FIELD, '<', today.getTime())
            .get();

        snapshot.forEach(t => {
            db.collection(QueryConstants.TASKS_COLLECTION).doc(t.id).delete();
        });

        db.collection(QueryConstants.TASKS_COLLECTION).doc(QueryConstants.LAST_REMOVE_DATE).set({
            date: today.getTime()
        });
    }
};

const getEmptyTasksMessage = (date) => {
    if (date.value.getTime() < calculateDate(0).getTime()) {
        return {value: `Er waren ${date.title.toLowerCase()} geen taken voor jou`, id: 'no-tasks'}
    }
    return {value: `Er zijn ${date.title.toLowerCase()} nog geen taken voor jou`, id: 'no-tasks'};
};

const getEmptyTaskToManageMessage = (date) => {
    if (date.value.getTime() < calculateDate(0).getTime()) {
        return {value: `Je hebt voor ${date.title.toLowerCase()} geen taken gemaakt`, id: 'no-tasks'}
    }
    return {value: `Je hebt voor ${date.title.toLowerCase()} nog geen taken gemaakt`, id: 'no-tasks'};
};
