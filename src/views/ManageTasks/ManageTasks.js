import React, {useEffect} from 'react';
import styles from './ManageTasks.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {getTasksToManage, setTaskToEdit} from "../../redux/actions/taskActions";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {MaterialUI} from "../../constants/UI/material-components";
import {BackButton} from "../../components";
import Loading from "../../components/Loading/Loading";

const ManageTasks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {username, tasks} = useSelector(state => ({
        username: state.user.username,
        tasks: state.task.tasksToManage
    }));

    useEffect(() => {
        dispatch(getTasksToManage(username))
    }, [dispatch, username]);

    const redirectToEditTask = (task) => {
        dispatch(setTaskToEdit(task));
        history.push(FRONTEND_ROUTES.EDIT_TASKS);
    };

    const renderTask = (t) => {
        return (
            <MaterialUI.Grid item xs={5} className={styles.card} key={t.id} onClick={() => redirectToEditTask(t)}>
                <p className={styles.header}>{t.Title.toUpperCase()}</p>
                <p className={`${styles.status} ${t.isDone ? styles.done : styles.toDo}`}>{t.isDone ? 'Voltooid' : 'Te Doen'}</p>
            </MaterialUI.Grid>
        );
    };

    const renderTasks = () => {
        return (
            <MaterialUI.Grid container justify="space-evenly" className={styles.taskContainer}>
                {tasks.map(t => {
                    if (t.Title) {
                        return renderTask(t)
                    }
                    return <p>{t}</p>
                })}
            </MaterialUI.Grid>
        )
    };

    console.log(tasks);

    return (
        <div className={styles.ManageTasks}>
            <MaterialUI.Grid container justify="flex-start" spacing={0} className={styles.buttonContainer}>
                <BackButton url={FRONTEND_ROUTES.HOME}/>
            </MaterialUI.Grid>
            {tasks.length > 0 ? renderTasks() : <Loading/>}
        </div>
    );
};

export default ManageTasks;
