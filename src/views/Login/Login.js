import React, {useEffect} from 'react';
import styles from './Login.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import GoogleLogo from "../../assets/images/Google-logo.png";
import {connect, useDispatch, useSelector} from 'react-redux';
import {login} from "../../redux/actions/userActions";
import {useHistory} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {checkAuth} from "../../services/firebase/auth/firebaseAuth.service";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {token} = useSelector(state => ({
        token: state.user.token
    }));

    const restoreLogin = () => {
        if (token) {
            history.push(FRONTEND_ROUTES.HOME);
        }
    };

    useEffect(() => {
        dispatch(checkAuth());
        restoreLogin()
    }, [dispatch, restoreLogin]);

    const loginUser = async () => {
        await dispatch(login());
        history.push(FRONTEND_ROUTES.HOME);
    };

    return (
        <div className={`${styles.Login} ${styles.fullHeight}`}>
            <MaterialUI.Grid container justify="center" spacing={0}
                             className={`${styles.fullHeight} ${styles.backgroundImage}`}>
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
