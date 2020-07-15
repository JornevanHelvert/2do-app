import React from 'react';
import styles from './RequiredFieldsModal.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import PropTypes from 'prop-types';
import {calculateDate} from "../../constants/dateSelector/dateToShow";

const RequiredFieldsModal = (props) => (
    <MaterialUI.Modal open={props.isModalOpen} onClose={props.closeModal}
                      labelledby="Er ging iets mis"
                      aria-describedby="De taak kan momenteel niet aangemaakt worden. Controleer alle verplichte velden.">
        <div className={styles.modal}>
            <h2>Er ging iets mis</h2>
            <p>
                {props.date.getTime() < calculateDate(0).getTime() ?
                'Datum mag niet in het verleden liggen'
                : 'De taak kan momenteel niet aangemaakt worden. Controleer alle verplichte velden.'}
            </p>
            <button onClick={props.closeModal}>Sluiten</button>
        </div>
    </MaterialUI.Modal>
);

RequiredFieldsModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    date: PropTypes.object
};

RequiredFieldsModal.defaultProps = {};

export default RequiredFieldsModal;
