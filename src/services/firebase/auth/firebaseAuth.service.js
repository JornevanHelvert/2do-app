import * as firebase from "firebase";
import app from "../../../constants/firebase/firebase";
import {restoreSession} from "../../../redux/actions/userActions";

export const doSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return app.auth().signInWithPopup(provider);
};

export const checkAuth = () => dispatch => firebase.auth().onAuthStateChanged(user => {
    if (user) {
        dispatch(restoreSession(user));
    }
});

export const doSignOut = async () => app.auth().signOut();
