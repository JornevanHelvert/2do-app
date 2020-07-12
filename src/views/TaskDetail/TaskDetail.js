import React from 'react';
import styles from './TaskDetail.module.css';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {MaterialUI} from "../../constants/UI/material-components";
import {BackButton} from "../../components";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {updateTaskStatus} from "../../redux/actions/taskActions";
import {
    sendMessageTaskStatusUpdated
} from "../../services/firebase/fcm/cloudMessaging.service";

const TaskDetail = () => {
    const dispatch = useDispatch();
    const {task} = useSelector(state => ({
        task: state.task.taskForDetail,
    }));

    const updateStatus = async () => {
        dispatch(updateTaskStatus(task));
        await sendMessageTaskStatusUpdated(task);
    };

    return (
        <MaterialUI.Grid container justify="flex-start">
            <MaterialUI.Grid container justify="flex-start" spacing={0} className={styles.buttonContainer}>
                <BackButton url={FRONTEND_ROUTES.TASKS}/>
            </MaterialUI.Grid>
            <MaterialUI.Grid item xs={12} className={styles.TaskDetail}>
                <h1>{task.Title}</h1>
                <section className={styles.row}>
                    <h3>Extra informatie</h3>
                    <p>{task.Description}</p>
                </section>
                <section className={styles.row}>
                    <h3>Tegen wanneer?</h3>
                    <p>{moment(task.DueDate).format('DD MMMM YYYY')}</p>
                </section>
                <section className={styles.row}>
                    <h3>Taak aangemaakt op</h3>
                    <p>{moment(task.CreationDate).format('DD MMMM YYYY')}</p>
                </section>
                <section className={styles.row}>
                    <h3>Taak aangemaakt door</h3>
                    <p>{task.Creator}</p>
                </section>
                <section className={styles.row}>
                    <button className={task.isDone ? styles.markAsNotDone : styles.markAsDone}
                            onClick={updateStatus}>
                       {task.isDone? 'Markeren als onvoltooid' : 'Markeren als voltooid'}
                    </button>
                </section>
            </MaterialUI.Grid>
        </MaterialUI.Grid>
    );
};

TaskDetail.propTypes = {};

TaskDetail.defaultProps = {};

export default TaskDetail;
