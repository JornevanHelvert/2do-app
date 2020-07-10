import ActionTypes from "../../constants/redux/ActionTypes";
import {getImages, uploadImageToFirebase} from "../../services/firebase/storage/cloudStorage.service";

const setDownloadImages = ({images, nextPageToken}) => ({
    type: ActionTypes.DOWNLOAD_IMAGES,
    images,
    nextPageToken
});

const setImageForDetail = imageUrl => ({
    type: ActionTypes.IMAGE_DETAIL,
    imageUrl
});

const setImageUploadSuccess = imageUrl => ({
    type: ActionTypes.IMAGE_UPLOAD_SUCCESS,
    imageUrl
});

export const downloadImages = () => async dispatch => {
  try {
      const {images, nextPageToken} = await getImages();

      dispatch(setDownloadImages({images, nextPageToken}));
  } catch (e) {
      console.log(e);
  }
};

export const imageForDetail = (imageUrl) => async dispatch => {
    try {
        dispatch(setImageForDetail(imageUrl));
    } catch (e) {
        console.log(e);
    }
};

export const uploadImage = (imageList) => async dispatch => {
    try {
        if (imageList.length > 0) {
            const imageUrl = await uploadImageToFirebase(imageList);
            dispatch(setImageUploadSuccess(imageUrl));
        }
    } catch (e) {
        console.log(e);
    }
}
