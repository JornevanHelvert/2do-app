import React from 'react';
import styles from './DateSelector.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import PropTypes from "prop-types";

const DateSelector = (props) => {
    return (
        <MaterialUI.Grid container justify="center">
            <MaterialUI.Grid item xs={3} className={styles.alignment}>
                <button onClick={() => props.updateDate(-1)}>&lt;</button>
            </MaterialUI.Grid>
            <MaterialUI.Grid item xs={6} className={styles.alignment}>
                <h2>{props.date.title}</h2>
            </MaterialUI.Grid>
            <MaterialUI.Grid item xs={3} className={styles.alignment}>
                <button onClick={() => props.updateDate(1)}>&gt;</button>
            </MaterialUI.Grid>
        </MaterialUI.Grid>
    );
};

DateSelector.propTypes = {
    date: PropTypes.object,
    updateDate: PropTypes.func
};

DateSelector.defaultProps = {};

export default DateSelector;
