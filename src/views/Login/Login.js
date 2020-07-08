import React from 'react';
import styles from './Login.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import GoogleLogo from "../../assets/images/Google-logo.png";
import {connect, useDispatch} from 'react-redux';
import {login} from "../../redux/actions/userActions";
import {useHistory} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const loginUser = async () => {
        await dispatch(login());
        history.push(FRONTEND_ROUTES.HOME);
    };

    return (
        <div className={styles.Login}>
            <MaterialUI.Grid container justify="center" spacing={6} className={styles.fullHeight}>
                <MaterialUI.Grid item xs={4}>
                    <MaterialUI.Paper className={styles.LoginPaperGrid}>
                        <img src={GoogleLogo} alt="Google logo" className={styles.GoogleLogo} onClick={loginUser}/>
                    </MaterialUI.Paper>
                </MaterialUI.Grid>
            </MaterialUI.Grid>
        </div>
    )
};

export default connect()(Login);
