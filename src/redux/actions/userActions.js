import {doSignInWithGoogle} from "../../constants/firebase/firebase";
import ActionTypes from "../../constants/redux/ActionTypes";

const setLoginSuccess = ({token, firstName, email}) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    token,
    firstName,
    email
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
