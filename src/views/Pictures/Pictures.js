import React, {useEffect} from 'react';
import styles from './Pictures.module.css';
import {connect, useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {MaterialUI} from "../../constants/UI/material-components";
import {downloadImages, imageForDetail, uploadImage} from "../../redux/actions/imageActions";
import LoadingGif from "../../assets/gifs/loading.gif";
import {BackButton} from "../../components/index";

const Pictures = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {imageUrls, nextPageToken} = useSelector(state => ({
        imageUrls: state.image.images,
        nextPageToken: state.image.nextPageToken
    }));


    useEffect(() => {
        dispatch(downloadImages());
    }, []);

    const setImageForDetail = (imageUrl) => {
        dispatch(imageForDetail(imageUrl));
        history.push(FRONTEND_ROUTES.PICTURE_DETAILS);
    };

    const renderImage = (url, key) => {
        return (
            <MaterialUI.Grid item xs={2} key={key}>
                <img alt="personal image" src={url} className={styles.image} onClick={() => setImageForDetail(url)}/>
            </MaterialUI.Grid>
        )
    };

    const renderLoading = () => {
        return (
            <MaterialUI.Grid item xs={12} className={styles.loading}>
                <img className={styles.loadingGif} src={LoadingGif} alt="Loading..."/>
            </MaterialUI.Grid>
        )
    };

    const upload = (e) => dispatch(uploadImage(e.target.files));

    return (
        <div className={styles.Pictures}>
            <MaterialUI.Grid container justify="space-evenly" spacing={0}>
                <BackButton url={FRONTEND_ROUTES.HOME} />
                <MaterialUI.Grid item xs={6}>
                    <div className={styles.addButton}>
                        <input type="file" id="file" onChange={e => upload(e)}/>
                        <label htmlFor="file">+ Toevoegen</label>
                    </div>
                </MaterialUI.Grid>
            </MaterialUI.Grid>
            <MaterialUI.Grid container justify="flex-start" spacing={0} className={styles.imagesContainer}>
                {imageUrls.length > 0 ? imageUrls.map((value, key) =>
                    renderImage(value, key)
                ) : renderLoading()}
            </MaterialUI.Grid>
        </div>
    )
};

export default connect()(Pictures);
