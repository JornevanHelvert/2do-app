import React from 'react';
import PropTypes from "prop-types";
import {MaterialUI} from "../../constants/UI/material-components";

const DialogComponent = (props) => {
    return (
        <MaterialUI.Dialog
            open={props.open}
            onClose={props.setOpenToClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <MaterialUI.DialogTitle id="alert-dialog-slide-title">{props.title}</MaterialUI.DialogTitle>
            <MaterialUI.DialogContent>
                <MaterialUI.DialogContentText>
                    {props.content}
                </MaterialUI.DialogContentText>
            </MaterialUI.DialogContent>
            <MaterialUI.DialogActions>
                <MaterialUI.Button onClick={props.setOpenToClose} color="primary">
                    Nee
                </MaterialUI.Button>
                <MaterialUI.Button onClick={props.confirm} color="primary">
                    Ja
                </MaterialUI.Button>
            </MaterialUI.DialogActions>
        </MaterialUI.Dialog>
    );
};

DialogComponent.propTypes = {
    open: PropTypes.bool,
    setOpenToClose: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
    confirm: PropTypes.func
};

export default DialogComponent;
