import * as firebase from "firebase";

const messaging = firebase.messaging();
messaging.usePublicVapidKey(process.env.REACT_APP_FCM_TOKEN);

export const askNotificationPermission = () => {
    messaging.getToken().then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
};
