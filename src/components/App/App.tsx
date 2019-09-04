import React, { lazy, Suspense } from 'react';
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, SecureRoute } from "../conditionalRoute";

const DashboardPage = lazy(() => import("../../pages/DashboardPage/DashboardPage"));
const LoginFormPage = lazy(() => import("../../pages/LoginFormPage/LoginFormPage"));
const PageNotFound = lazy(() => import("../../pages/PageNotFound/PageNotFound"));

const App: React.FC = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <SecureRoute path="/" exact component={DashboardPage}/>
                <AuthRoute path="/login" exact component={LoginFormPage}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Suspense>
    );
};

export default hot(module)(App);
