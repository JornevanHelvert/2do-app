import app from "../../../constants/firebase/firebase";

const storage = app.storage();
const bucket = storage.ref('/');

export const getImages = async () => {
    const images = await bucket.list({maxResults: 12});
    const imageUrls = [];

    for (let i = 0; i < images.items.length; i++) {
        const url = await bucket.child(images.items[i].name).getDownloadURL();
        imageUrls.push(url);
    }

    return {images: imageUrls, nextPageToken: images.nextPageToken}
};

export const uploadImageToFirebase = async (imageList) => {
    const imageRef = bucket.child(imageList[0].name);
    await imageRef.put(imageList[0]);
    return imageRef.getDownloadURL();
};
