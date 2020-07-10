import React, {useEffect} from 'react';
import styles from './Tasks.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import {BackButton} from "../../components";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import Loading from "../../components/Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {getTasks, setTaskForDetail} from "../../redux/actions/taskActions";
import {useHistory} from "react-router";

const Tasks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {userFirstName, tasks} = useSelector(state => ({
        userFirstName: state.user.firstName,
        tasks: state.task.tasks
    }));

    useEffect(() => {
        dispatch(getTasks(userFirstName))
    }, [dispatch]);

    const redirectToTaskDetail = async (t) => {
        await dispatch(setTaskForDetail(t));
        history.push(FRONTEND_ROUTES.TASK_DETAILS);
    };

    const renderTask = (t) => {
        return (
            <MaterialUI.Grid item xs={5} className={styles.card} key={`${t.CreationDate} ${t.title} ${t.DueDate}`}
                             onClick={() => redirectToTaskDetail(t)}>
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

    return (
        <div className={styles.Tasks}>
            <MaterialUI.Grid container justify="flex-start" spacing={0} className={styles.buttonContainer}>
                <BackButton url={FRONTEND_ROUTES.HOME}/>
            </MaterialUI.Grid>
            {tasks.length > 0 ? renderTasks() : <Loading/>}
        </div>
    );
}

export default Tasks;
