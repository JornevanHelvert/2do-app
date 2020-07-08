import React from 'react';
import styles from './BackButton.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import PropTypes from "prop-types";
import {useHistory} from "react-router";

const BackButton = (props) => {
    const history = useHistory();
    const redirectToHome = () => history.push(props.url);

    return (
        <MaterialUI.Grid item xs={6}>
            <div className={styles.backButton} onClick={redirectToHome}>&lt; Terug</div>
        </MaterialUI.Grid>
    );
};

BackButton.propTypes = {
    url: PropTypes.string,
};

BackButton.defaultProps = {};

export default BackButton;
