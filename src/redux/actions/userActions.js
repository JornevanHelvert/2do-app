import {doSignInWithGoogle, doSignOut} from "../../services/firebase/auth/firebaseAuth.service";
import ActionTypes from "../../constants/redux/ActionTypes";
import {getUsersFromFirestore} from "../../services/firebase/firestore/firestore.service";

const setLoginSuccess = ({token, username, email}) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    token,
    username,
    email
});

const setLogoutSuccess = () => ({
    type: ActionTypes.LOGOUT_USER
});

const setAllUsersSuccess = (users) => ({
    type: ActionTypes.GET_ALL_USERS,
    users
});

export const login = () => async dispatch => {
    try {
        const result = await doSignInWithGoogle();
        const username = result.user.displayName;
        dispatch(setLoginSuccess({
            token: result.credential.accessToken,
            username: username,
            email: result.user.email
        }));
    } catch (e) {
        console.log(e);
    }
};

export const restoreSession = (user) => async dispatch => {
    try {
        if (user) {
            const username = user.displayName;
            dispatch(setLoginSuccess({
                token: user.refreshToken,
                username,
                email: user.email
            }));
        }
    } catch (e) {
        console.log(e);
    }
};

export const logout = () => async dispatch => {
    try {
        await doSignOut();
        dispatch(setLogoutSuccess());
    } catch (e) {
        console.log(e);
    }
};

export const getAllUsers = () => async dispatch => {
    try {
        const users = await getUsersFromFirestore();
        console.log(users);
        dispatch(setAllUsersSuccess(users));
    } catch (e) {
        console.log(e);
    }
};
