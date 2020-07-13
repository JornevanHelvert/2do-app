import React, {useEffect, useState} from 'react';
import styles from './EditTasks.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import {BackButton, DialogComponent} from "../../components";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {removeTask, updateTask} from "../../redux/actions/taskActions";
import {getAllUsers} from "../../redux/actions/userActions";
import moment from "moment";

const EditTasks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {users, task} = useSelector(state => ({
        users: state.user.users,
        task: state.task.taskToEdit
    }));

    const [title, setTitle] = useState(task.Title);
    const [description, setDescription] = useState(task.Description);
    const [date, setDate] = useState(new Date(task.DueDate));
    const [receiver, setReceiver] = useState(task.Receiver);
    const [open, setOpen] = useState(false);

    const update = async () => {
        await dispatch(updateTask({title, description, date, receiver, task}));
        history.push(FRONTEND_ROUTES.MANAGE_TASKS);
    };

    const deleteTask = async () => {
        await dispatch(removeTask(task));
        history.push(FRONTEND_ROUTES.MANAGE_TASKS);
    };

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <div className={styles.EditTasks}>
            <MaterialUI.Grid container justify="center">
                <MaterialUI.Grid container justify="flex-start" spacing={0} className={styles.buttonContainer}>
                    <BackButton url={FRONTEND_ROUTES.MANAGE_TASKS}/>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={12} className={styles.alignment}>
                    <h1 className={styles.header}>Bewerk de taak</h1>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4} className={styles.label}>
                    <label>Voor*: </label>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={8} className={styles.alignment}>
                    <select name="reciever" id="reciever" className={styles.input} value={receiver}
                            onChange={(e) => setReceiver(e.target.value)}>
                        {users.map(u => {
                            return <option value={u.name} key={u.id}>{u.nickname}</option>
                        })}
                    </select>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4} className={styles.label}>
                    <label>Titel: </label>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={8} className={styles.alignment}>
                    <input type="text" className={styles.input} value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4} className={styles.label}>
                    <label>Extra info: </label>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={8} className={styles.alignment}>
                    <input type="text" className={styles.input} value={description}
                           onChange={(e) => setDescription(e.target.value)}/>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={4} className={styles.label}>
                    <label>Datum: </label>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={8} className={styles.alignment}>
                    <input type="date" className={styles.input} value={moment(date).format('YYYY-MM-DD')}
                           onChange={(e) => setDate(new Date(e.target.value).getTime())}/>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={12} className={styles.alignment}>
                    <button className={`${styles.button} ${styles.saveButton}`} onClick={update}>Opslaan</button>
                </MaterialUI.Grid>
                <MaterialUI.Grid item xs={12} className={styles.alignment}>
                    <button className={`${styles.button} ${styles.removeButton}`} onClick={() => setOpen(true)}>Verwijderen</button>
                </MaterialUI.Grid>
                <DialogComponent open={open} confirm={deleteTask} setOpenToClose={() => setOpen(false)} title="Taak verwijderen"
                                 content="Ben je zeker dat je de taak wilt verwijderen?"/>
            </MaterialUI.Grid>
        </div>
    );
};

export default EditTasks;
