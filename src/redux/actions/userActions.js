import {doSignInWithGoogle, doSignOut} from "../../constants/firebase/firebase";
import ActionTypes from "../../constants/redux/ActionTypes";

const setLoginSuccess = ({token, firstName, email}) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    token,
    firstName,
    email
});

const setLogoutSuccess = () => ({
    type: ActionTypes.LOGOUT_USER
});

export const login = () => async dispatch => {
    try {
        const result = await doSignInWithGoogle();
        const userFirstname = result.user.displayName.substring(0, result.user.displayName.indexOf(' '));
        dispatch(setLoginSuccess({
            token: result.credential.accessToken,
            firstName: userFirstname,
            email: result.user.email
        }));
    } catch (e) {
        console.log(e);
    }
};

export const restoreSession = (user) => async dispatch => {
    try {
        if (user) {
            const userFirstname = user.displayName.substring(0, user.displayName.indexOf(' '));
            dispatch(setLoginSuccess({
                token: user.refreshToken,
                firstName: userFirstname,
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
