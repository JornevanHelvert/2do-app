import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    token: '',
    firstName: '',
    email: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                token: action.token,
                firstName: action.firstName,
                email: action.email
            }
        }
        case ActionTypes.LOGOUT_USER: {
            return {
                ...state,
                token: '',
                firstName: '',
                email: ''
            }
        }
        default:
            return {
                ...state
            }
    }
}
