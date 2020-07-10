import * as firebase from "firebase";
import {writeFcmTokenToDb} from "../firestore/firestore.service";

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
