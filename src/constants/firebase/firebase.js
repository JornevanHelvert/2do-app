import app from "firebase/app";
import * as firebase from "firebase";
import 'firebase/storage';
import {restoreSession} from "../../redux/actions/userActions";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

app.initializeApp(firebaseConfig);
app.analytics();

export const doSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return app.auth().signInWithPopup(provider);
};

export const doSignOut = async () => app.auth().signOut();

export const checkAuth = () => dispatch => firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        dispatch(restoreSession(user));
    }
});

const storage = app.storage();
export const bucket = storage.ref('/');
