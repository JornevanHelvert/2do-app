import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    images: [],
    nextPageToken: '',
    detailImageUrl: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.DOWNLOAD_IMAGES: {
            return {
                ...state,
                images: action.images,
                nextPageToken: action.nextPageToken
            }
        }
        case ActionTypes.IMAGE_DETAIL: {
            return {
                ...state,
                detailImageUrl: action.imageUrl
            }
        }
        case ActionTypes.IMAGE_UPLOAD_SUCCESS: {
            return {
                ...state,
                images: [
                    ...state.images,
                    action.imageUrl
                ]
            }
        }
        default:
            return {
                ...state
            };
    }
}
