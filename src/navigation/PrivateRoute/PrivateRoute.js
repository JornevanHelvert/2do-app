import React from 'react';
import {Route, Redirect} from "react-router";
import {FRONTEND_ROUTES} from "../../constants/navigation/Routes";

const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
    <Route exact {...rest} render={
        props => (authenticated ? <Component {...props}/> : <Redirect to={FRONTEND_ROUTES.LOGIN}/>)
    }/>
);

export default PrivateRoute;
