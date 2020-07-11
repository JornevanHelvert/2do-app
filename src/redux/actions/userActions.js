import {doSignInWithGoogle, doSignOut} from "../../services/firebase/auth/firebaseAuth.service";
import ActionTypes from "../../constants/redux/ActionTypes";

const setLoginSuccess = ({token, username, email}) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    token,
    username,
    email
});

const setLogoutSuccess = () => ({
    type: ActionTypes.LOGOUT_USER
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
