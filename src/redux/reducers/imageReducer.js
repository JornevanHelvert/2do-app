import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    images: [],
    nextPageToken: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.DOWNLOAD_IMAGES: {
            return {
                ...state,
                images: action.images,
                nextPageToken: action.nextPageToken
            }
        }
        default:
            return {
                ...state
            };
    }
}
