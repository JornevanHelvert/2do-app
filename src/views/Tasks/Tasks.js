import React, {useEffect, useState} from 'react';
import styles from './Tasks.module.css';
import {MaterialUI} from "../../constants/UI/material-components";
import {BackButton} from "../../components";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import Loading from "../../components/Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {clearTasks, getTasks, setTaskForDetail} from "../../redux/actions/taskActions";
import {useHistory} from "react-router";
import DateSelector from "../../components/DateSelector/DateSelector";
import {dateToShow} from "../../constants/dateSelector/dateToShow";

const Tasks = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [dateIndex, setDateIndex] = useState(5);
    const [date, setDate] = useState(dateToShow[dateIndex]);
    const {username, tasks} = useSelector(state => ({
        username: state.user.username,
        tasks: state.task.tasks
    }));

    useEffect(() => {
        dispatch(getTasks({user: username, date}));
    }, [dispatch, username, date]);

    const redirectToTaskDetail = async (t) => {
        await dispatch(setTaskForDetail(t));
        history.push(FRONTEND_ROUTES.TASK_DETAILS);
    };

    const updateDate = async (index) => {
        let newIndex = dateIndex + index;
        if (newIndex === dateToShow.length || newIndex < 0) {
            return;
        }

        await dispatch(clearTasks());
        const newDate = dateToShow[newIndex];
        setDateIndex(newIndex);
        setDate(newDate);
        await dispatch(getTasks({user: username, date: newDate}));
    };

    const renderTask = (t) => {
        return (
            <MaterialUI.Grid item xs={5} className={styles.card} key={t.id}
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
                    return <p key={t.id}>{t.value}</p>
                })}
            </MaterialUI.Grid>
        )
    };

    return (
        <div className={styles.Tasks}>
            <MaterialUI.Grid container justify="flex-start" spacing={0} className={styles.buttonContainer}>
                <BackButton url={FRONTEND_ROUTES.HOME}/>
            </MaterialUI.Grid>
            <DateSelector date={date} updateDate={updateDate}/>
            {tasks.length > 0 ? renderTasks() : <Loading/>}
        </div>
    );
};

export default Tasks;
