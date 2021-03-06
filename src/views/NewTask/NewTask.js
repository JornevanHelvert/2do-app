import React, {useEffect, useState} from 'react';
import styles from './NewTask.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../redux/actions/userActions";
import {createTask} from "../../redux/actions/taskActions";
import {useHistory} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {BackButton} from "../../components";
import RequiredFieldsModal from "../../components/RequiredFieldsModal/RequiredFieldsModal";
import moment from "moment";

const NewTask = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {users, currentUser} = useSelector(state => ({
        users: state.user.users,
        currentUser: state.user.username
    }));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [receiver, setReceiver] = useState('Ceylan Ools');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const addTask = async () => {
        try {
            setButtonDisabled(true);
            await dispatch(createTask({title, description, date, receiver, currentUser}));
            history.push(FRONTEND_ROUTES.HOME);
        } catch (e) {
            setIsModalOpen(true);
            setButtonDisabled(false);
        }
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div className={styles.NewTask}>
            <MaterialUI.Grid container justify="center">
                <MaterialUI.Grid container justify="flex-start" spacing={0} className={styles.buttonContainer}>
                    <BackButton url={FRONTEND_ROUTES.HOME}/>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={12} className={styles.alignment}>
                    <h1 className={styles.header}>Maak een nieuwe taak</h1>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4} className={styles.label}>
                    <label>Voor*: </label>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={8} className={styles.alignment}>
                    <select name="reciever" id="reciever" className={styles.input}
                            onChange={(e) => setReceiver(e.target.value)}>
                        {users.map(u => {
                            return <option value={u.name} key={u.id}>{u.nickname}</option>
                        })}
                    </select>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4} className={styles.label}>
                    <label>Titel*: </label>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={8} className={styles.alignment}>
                    <input type="text" className={styles.input} onChange={(e) => setTitle(e.target.value)}/>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4} className={styles.label}>
                    <label>Extra info: </label>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={8} className={styles.alignment}>
                    <input type="text" className={styles.input} onChange={(e) => setDescription(e.target.value)}/>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4} className={styles.label}>
                    <label>Datum*: </label>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={8} className={styles.alignment}>
                    <input type="date" className={styles.input} value={moment(date).format('YYYY-MM-DD')}
                           onChange={(e) => setDate(new Date(e.target.value))}/>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={12} className={styles.alignment}>
                    <button className={styles.button} onClick={addTask} disabled={buttonDisabled}>Maak aan</button>
                </MaterialUI.Grid>
                <RequiredFieldsModal closeModal={() => setIsModalOpen(false)} isModalOpen={isModalOpen} date={date}/>
            </MaterialUI.Grid>
        </div>
    );
};

export default NewTask;
