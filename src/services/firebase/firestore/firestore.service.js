import * as firebase from "firebase";
import QueryConstants from "../../../constants/firebase/queryConstants";

const db = firebase.firestore();

const getTasks = async () => {
    const snapshot = await db.collection(QueryConstants.TASKS_COLLECTION)
    .where(QueryConstants.DUE_DATE_FIELD, '>=', Date.now())
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
    const tasks = await getTasks();

    if (tasks.length === 0) {
        tasks.push('Er zijn nog geen taken voor jou');
        return tasks;
    }

    return tasks.filter(t => t.Receiver === user);
};

export const getTasksToManageFromFirestore = async (user) => {
    const tasks = await getTasks();

    if (tasks.length === 0) {
        tasks.push('Je hebt nog geen taken gemaakt');
        return tasks;
    }

    return tasks.filter(t => t.Creator === user);
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
        CreationDate: new Date(),
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
