import React, {useEffect} from 'react';
import styles from './Pictures.module.css';
import {connect, useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {MaterialUI} from "../../constants/UI/material-components";
import {downloadImages, imageForDetail, uploadImage} from "../../redux/actions/imageActions";
import {BackButton} from "../../components/index";
import Loading from "../../components/Loading/Loading";

const Pictures = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {imageUrls} = useSelector(state => ({
        imageUrls: state.image.images,
        nextPageToken: state.image.nextPageToken
    }));


    useEffect(() => {
        dispatch(downloadImages());
    }, [dispatch]);

    const setImageForDetail = (imageUrl) => {
        dispatch(imageForDetail(imageUrl));
        history.push(FRONTEND_ROUTES.PICTURE_DETAILS);
    };

    const renderImage = () => {
        return (
            <div className={styles.imagesContainer}>
                <MaterialUI.GridList cellHeight={400} className={styles.imagesList}>
                    {imageUrls.map((value, key) =>
                        <MaterialUI.GridListTile key={key} cols={1}>
                            <img alt="personal" src={value} onClick={() => setImageForDetail(value)}/>
                        </MaterialUI.GridListTile>
                    )}
                </MaterialUI.GridList>
            </div>
        )
    };

    const upload = (e) => dispatch(uploadImage(e.target.files));

    return (
        <div className={styles.Pictures}>
            <MaterialUI.Grid container justify="space-evenly" spacing={0} className={styles.buttonContainer}>
                <BackButton url={FRONTEND_ROUTES.HOME}/>
                <MaterialUI.Grid item xs={6}>
                    <div className={styles.addButton}>
                        <label htmlFor="file">+</label>
                        <input type="file" id="file" onChange={e => upload(e)}/>
                    </div>
                </MaterialUI.Grid>
            </MaterialUI.Grid>
            {imageUrls.length > 0 ? renderImage() : <Loading />}
        </div>
    )
};

export default connect()(Pictures);
