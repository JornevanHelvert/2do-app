import {bucket} from "../../constants/firebase/firebase";
import ActionTypes from "../../constants/redux/ActionTypes";

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
      const images = await bucket.list({maxResults: 12});

      console.log(images);

      const imageUrls = [];

      for (let i = 0; i < images.items.length; i++) {
          const url = await bucket.child(images.items[i].name).getDownloadURL();
          console.log(url);
          imageUrls.push(url);
      }

      console.log(imageUrls);

      dispatch(setDownloadImages({images: imageUrls, nextPageToken: images.nextPageToken}));
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
            const imageRef = bucket.child(imageList[0].name);
            await imageRef.put(imageList[0]);
            const imageUrl = await imageRef.getDownloadURL();
            dispatch(setImageUploadSuccess(imageUrl));
        }
    } catch (e) {
        console.log(e);
    }
}
