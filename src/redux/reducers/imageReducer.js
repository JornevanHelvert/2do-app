import ActionTypes from "../../constants/redux/ActionTypes";

const initialState = {
    images: [],
    nextPageToken: '',
    detailImageUrl: ''
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
        case ActionTypes.IMAGE_DETAIL: {
            return {
                ...state,
                detailImageUrl: action.imageUrl
            }
        }
        default:
            return {
                ...state
            };
    }
}
