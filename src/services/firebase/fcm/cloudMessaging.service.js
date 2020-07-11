import * as firebase from "firebase";
import {getReceiverToken, writeFcmTokenToDb} from "../firestore/firestore.service";

const messaging = firebase.messaging();
messaging.usePublicVapidKey(process.env.REACT_APP_FCM_TOKEN);

export const askNotificationPermission = async (user) => {
    await messaging.getToken().then((currentToken) => {
        if (currentToken) {
            writeFcmTokenToDb({user, token: currentToken});
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
};

export const setRefreshTokenListener = async (user) => messaging.onTokenRefresh(() => {
    askNotificationPermission(user)
});

export const sendMessageTaskCompleted = async ({accessToken, task}) => {
    const token = await getReceiverToken(task.Creator);

    console.log(token);
    console.log(accessToken);

    // fetch(`https://fcm.googleapis.com/v1/projects/${process.env.REACT_APP_PROJECT_ID}/messages:send`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${accessToken}`
    //     },
    //     body: JSON.stringify({
    //         "message": {
    //             "token": token,
    //             "notification": {
    //                 "title": "Taak voltooid",
    //                 "body": `${task.title} is voltooid door ${task.Receiver}`
    //             },
    //             "webpush": {
    //                 "headers": {
    //                     "Urgency": "high"
    //                 },
    //                 "notification": {
    //                     "body": `${task.title} is voltooid door ${task.Receiver}`,
    //                     "requireInteraction": "true",
    //                     "badge": "/logo512.png"
    //                 }
    //             }
    //         }
    //     })
    // });
};
