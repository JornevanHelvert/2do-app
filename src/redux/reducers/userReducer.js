import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    token: '',
    username: '',
    email: '',
    users: [],
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
        case ActionTypes.GET_ALL_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        default:
            return {
                ...state
            }
    }
}
