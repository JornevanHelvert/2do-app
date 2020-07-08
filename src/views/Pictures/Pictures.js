import React, {useEffect} from 'react';
import styles from './Pictures.module.css';
import {connect, useDispatch} from "react-redux";
import {downloadImages} from "../../redux/actions/imageActions";
import {useHistory} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {MaterialUI} from "../../constants/UI/material-components";

const Pictures = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(downloadImages());
    });

    const redirectToHome = () => history.push(FRONTEND_ROUTES.HOME);

    return (
        <div className={styles.Pictures}>
            <MaterialUI.Grid container justify="space-evenly" spacing={0}>
                <MaterialUI.Grid item xs={6}>
                    <div className={styles.backButton} onClick={redirectToHome}>&lt; Terug</div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={6}>
                    <div className={styles.addButton}>
                        <input type="file" id="file"/>
                        <label for="file">+ Toevoegen</label>
                    </div>
                </MaterialUI.Grid>
            </MaterialUI.Grid>
            <MaterialUI.Grid container justify="space-evenly" spacing={0} className={styles.imagesContainer}>
                <MaterialUI.Grid item xs={3}>
                    <div className={styles.backButton} onClick={redirectToHome}>&lt; Terug</div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={3}>
                    <div className={styles.backButton} onClick={redirectToHome}>&lt; Terug</div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={3}>
                    <div className={styles.backButton} onClick={redirectToHome}>&lt; Terug</div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={3}>
                    <div className={styles.backButton} onClick={redirectToHome}>&lt; Terug</div>
                </MaterialUI.Grid>
            </MaterialUI.Grid>
        </div>
    )
};

export default connect()(Pictures);
