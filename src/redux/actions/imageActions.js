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

export const downloadImages = () => async dispatch => {
  try {
      const images = await bucket.list({maxResults: 12});

      const imageUrls = [];

      for (let i = 0; i < images.items.length; i++) {
          const url = await bucket.child(images.items[i].name).getDownloadURL();
          imageUrls.push(url);
      }

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
