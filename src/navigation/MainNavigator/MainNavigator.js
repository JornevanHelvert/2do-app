import React from 'react';
import {Switch, Route, withRouter} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";
import {Views} from "../../views";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import {useSelector} from "react-redux";

export const MainNavigator = () => {
    const {authToken} = useSelector(state => ({
        authToken: state.user.token,
    }));

    return (
        <Switch>
            <Route exact path={FRONTEND_ROUTES.LOGIN} component={Views.LoginScreen}/>
            <PrivateRoute path={FRONTEND_ROUTES.HOME} component={Views.HomeScreen} authenticated={authToken}/>
            <PrivateRoute path={FRONTEND_ROUTES.PICTURE_DETAILS} component={Views.PictureDetailScreen}
                          authenticated={authToken}/>
            <PrivateRoute path={FRONTEND_ROUTES.PICTURES} component={Views.PicturesScreen} authenticated={authToken}/>
            <PrivateRoute path={FRONTEND_ROUTES.TASKS} component={Views.TasksScreen} authenticated={authToken}/>
            <PrivateRoute path={FRONTEND_ROUTES.TASK_DETAILS} component={Views.TaskDetailScreen}
                          authenticated={authToken}/>
        </Switch>
    );
};

MainNavigator.propTypes = {};

MainNavigator.defaultProps = {};

export default withRouter(MainNavigator);
