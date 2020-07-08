import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    token: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                token: action.token
            }
        }
        default:
            return {
                ...state
            }
    }
}
