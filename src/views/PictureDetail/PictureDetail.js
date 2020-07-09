import React from 'react';
import styles from './PictureDetail.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import {BackButton} from "../../components";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {useSelector} from "react-redux";

const PictureDetail = () => {
    const {imageUrl} = useSelector(state => ({
        imageUrl: state.image.detailImageUrl
    }));

    return (
        <div className={styles.PictureDetail}>
            <MaterialUI.Grid container justify="flex-start" spacing={0}>
                <BackButton url={FRONTEND_ROUTES.PICTURES} />
            </MaterialUI.Grid>
            <MaterialUI.Grid container justify="center" spacing={0} className={styles.marginTop}>
                <img src={imageUrl} className={styles.image} alt="Personal"/>
            </MaterialUI.Grid>
        </div>
    );
};

export default PictureDetail;
