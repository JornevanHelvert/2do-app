import * as firebase from "firebase";
import QueryConstants from "../../../constants/firebase/queryConstants";

const db = firebase.firestore();

export const getTasksFromFirestore = async (user) => {
    const snapshot = await db.collection(QueryConstants.TASKS_COLLECTION)
        .where(QueryConstants.RECEIVER_FIELD, '==', user.toLowerCase())
        .get();

    const tasks = [];

    await snapshot.forEach(t => {
        const task = {
            ...t.data(),
            CreationDate: t.data().CreationDate.toDate(),
            DueDate: t.data().DueDate.toDate(),
            id: t.id
        };
        tasks.push(task);
    });

    if (tasks.length === 0) {
        tasks.push('Er zijn nog geen taken voor jou')
    }

    return tasks;
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
        .set(({
            token
        }))
};
