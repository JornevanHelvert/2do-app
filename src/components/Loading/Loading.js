import React from 'react';
import styles from './Loading.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import LoadingGif from "../../assets/gifs/loading.gif";

const Loading = () => (
    <MaterialUI.Grid container justify="center" spacing={0}>
        <img className={styles.loadingGif} src={LoadingGif} alt="Loading..."/>
    </MaterialUI.Grid>
);

export default Loading;
