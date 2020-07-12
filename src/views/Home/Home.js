import React, {useEffect, useState} from 'react';
import styles from './Home.module.css';
import {useSelector, useDispatch} from "react-redux";
import {MaterialUI} from "../../constants/UI/material-components";
import {useHistory} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {logout} from "../../redux/actions/userActions";
import {DialogComponent} from "../../components/index";
import {
    askNotificationPermission,
    setRefreshTokenListener
} from "../../services/firebase/fcm/cloudMessaging.service";

const Home = () => {
    const {username} = useSelector(state => ({
        username: state.user.username
    }));

    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const redirectToPictures = () => history.push(FRONTEND_ROUTES.PICTURES);
    const redirectToTasks = () => history.push(FRONTEND_ROUTES.TASKS);
    const redirectToNewTask = () => history.push(FRONTEND_ROUTES.NEW_TASK);
    const signOut = async () => {
        setOpen(false);
        await dispatch(logout());
        history.push(FRONTEND_ROUTES.LOGIN);
    };

    useEffect(() => {
        askNotificationPermission(username).then();
        setRefreshTokenListener(username).then();
    }, [username]);

    return (
        <div className={styles.Home}>
            <h1>Welkom {username}</h1>
            <MaterialUI.Grid container justify="space-evenly" spacing={0}>
                <MaterialUI.Grid item xs={6} className={styles.centerAlign}>
                    <div className={styles.card} onClick={redirectToTasks}>
                        <h1>Mijn to do's</h1>
                    </div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={6}>
                    <div className={styles.card} onClick={redirectToNewTask}>
                        <h1>Nieuwe taak</h1>
                    </div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={6}>
                    <div className={styles.card}>
                        <h1>Taken beheren</h1>
                    </div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={6}>
                    <div className={styles.card} onClick={redirectToPictures}>
                        <h1>Bekijk foto's</h1>
                    </div>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={6}>
                    <div className={styles.card} onClick={() => setOpen(true)}>
                        <h1>Afmelden</h1>
                    </div>
                </MaterialUI.Grid>
            </MaterialUI.Grid>
            <DialogComponent open={open} signOut={signOut} setOpenToClose={() => setOpen(false)} title="Afmelden"
                             content="Ben je zeker dat je wilt afmelden?"/>
        </div>
    );
};

export default Home;
