import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    token: '',
    username: '',
    email: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                token: action.token,
                username: action.username,
                email: action.email
            }
        }
        case ActionTypes.LOGOUT_USER: {
            return {
                ...state,
                token: '',
                username: '',
                email: ''
            }
        }
        default:
            return {
                ...state
            }
    }
}
