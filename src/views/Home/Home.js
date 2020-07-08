import React, {useEffect} from 'react';
import styles from './Home.module.css';
import {useDispatch, useSelector} from "react-redux";
import {MaterialUI} from "../../constants/UI/material-components";
import {useHistory} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {downloadImages} from "../../redux/actions/imageActions";

const Home = () => {
    const {firstName} = useSelector(state => ({
        firstName: state.user.firstName
    }));

    const history = useHistory();
    const dispatch = useDispatch();

    const redirectToPictures = () => history.push(FRONTEND_ROUTES.PICTURES);
    const redirectToTasks = () => history.push(FRONTEND_ROUTES.TASKS);

    useEffect(() => {
        dispatch(downloadImages());
    }, []);

    return (
        <div className={styles.Home}>
            <h1>Welkom {firstName}</h1>
            <MaterialUI.Grid container justify="space-evenly" spacing={0}>
                <MaterialUI.Grid item xs={4}>
                    <div className={styles.card} onClick={redirectToTasks}>
                        <h1>Bekijk je taken</h1>
                    </div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4}>
                    <div className={styles.card} onClick={redirectToPictures}>
                        <h1>Bekijk foto's</h1>
                    </div>
                </MaterialUI.Grid>
            </MaterialUI.Grid>
        </div>
    );
};

export default Home;
