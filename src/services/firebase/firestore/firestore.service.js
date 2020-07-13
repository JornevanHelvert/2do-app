import * as firebase from "firebase";
import QueryConstants from "../../../constants/firebase/queryConstants";

const db = firebase.firestore();

const getTasks = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const snapshot = await db.collection(QueryConstants.TASKS_COLLECTION)
        .where(QueryConstants.DUE_DATE_FIELD, '>=', today.getTime())
        .orderBy(QueryConstants.DUE_DATE_FIELD)
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

export const getTasksFromFirestore = async (user) => {
    await removeOldTasks();
    const tasks = (
        await getTasks()
    ).filter(t => t.Receiver === user);

    if (tasks.length === 0) {
        tasks.push('Er zijn nog geen taken voor jou');
        return tasks;
    }

    return tasks;
};

export const getTasksToManageFromFirestore = async (user) => {
    const tasks = (
        await getTasks()
    ).filter(t => t.Creator === user);

    if (tasks.length === 0) {
        tasks.push('Je hebt nog geen taken gemaakt');
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
    const task = {
        CreationDate: Date.now(),
        Creator: currentUser,
        Description: description,
        DueDate: date,
        Receiver: receiver,
        Title: title,
        isDone: false
    };

    await db.collection(QueryConstants.TASKS_COLLECTION).doc().set(task);

    return task;
};

export const updateTaskInFirestore = async ({receiver, title, description, date, task}) => {
    task = {
        ...task,
        Description: description,
        DueDate: date,
        Receiver: receiver,
        Title: title,
    };

    await db.collection(QueryConstants.TASKS_COLLECTION).doc(task.id).set(task);

    return task;
};

export const removeTaskFromFirestore = async (task) => db.collection(QueryConstants.TASKS_COLLECTION).doc(task.id).delete();

const removeOldTasks = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastRemoveDate = (
        await db.collection(QueryConstants.TASKS_COLLECTION).doc(QueryConstants.LAST_REMOVE_DATE).get()
    ).data().date;

    if (lastRemoveDate && today.getTime() !== lastRemoveDate) {
        const snapshot = await db.collection(QueryConstants.TASKS_COLLECTION)
            .where(QueryConstants.DUE_DATE_FIELD, '<', today.getTime())
            .get();

        snapshot.forEach(t => {
            console.log(t.id);
            db.collection(QueryConstants.TASKS_COLLECTION).doc(t.id).delete();
        });

        db.collection(QueryConstants.TASKS_COLLECTION).doc(QueryConstants.LAST_REMOVE_DATE).set({
            date: today.getTime()
        });
    }
};
