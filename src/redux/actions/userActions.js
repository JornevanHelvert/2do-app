import {doSignInWithGoogle} from "../../constants/firebase/firebase";
import ActionTypes from "../../constants/redux/ActionTypes";

const setLoginSuccess = token => ({
    type: ActionTypes.LOGIN_SUCCESS,
    token
});

export const login = () => async dispatch => {
    try {
        const result = await doSignInWithGoogle();
        const userFirstname = result.user.displayName.substring(0, result.user.displayName.indexOf(' '));
        console.log(userFirstname, result.user.email);
        dispatch(setLoginSuccess(result.credential.accessToken));
    } catch (e) {
        console.log(e);
    }
};
