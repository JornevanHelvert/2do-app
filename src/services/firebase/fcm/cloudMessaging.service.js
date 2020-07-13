import * as firebase from "firebase";
import {getReceiverToken, writeFcmTokenToDb} from "../firestore/firestore.service";
import cloudFunctionUrls from "../../../constants/firebase/cloudFunctionUrls";

let messaging = null;

if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
    messaging.usePublicVapidKey(process.env.REACT_APP_FCM_TOKEN);
}

export const askNotificationPermission = async (user) => {
    if (!messaging) return;
    await messaging.getToken().then((currentToken) => {
        if (currentToken) {
            writeFcmTokenToDb({user, token: currentToken});
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
};

export const setRefreshTokenListener = async (user) => {
    if (!messaging) return;
    messaging.onTokenRefresh(() => {
        askNotificationPermission(user)
    });
};

export const sendMessageTaskStatusUpdated = async (task) => {
    const token = await getReceiverToken(task.Creator);

    await fetch(cloudFunctionUrls.TASK_STATUS_UPDATED, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token,
            task
        })
    });
};

export const sendMessageTaskCreated = async (task) => {
    const token = await getReceiverToken(task.Receiver);

    await fetch(cloudFunctionUrls.TASK_CREATED, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token,
            user: task.Creator
        })
    })
};

export const sendMessageTaskDeleted = async (task) => {
    const token = await getReceiverToken(task.Receiver);

    await fetch(cloudFunctionUrls.TASK_CREATED, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token,
            user: task.Creator,
            task: task.Title
        })
    })
};
