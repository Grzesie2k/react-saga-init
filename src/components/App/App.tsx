import React, { lazy, Suspense } from 'react';
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";

const DashboardPage = lazy(() => import("../../pages/DashboardPage/DashboardPage"));
const LoginFormPage = lazy(() => import("../../pages/LoginFormPage/LoginFormPage"));
const PageNotFound = lazy(() => import("../../pages/PageNotFound/PageNotFound"));

const App: React.FC = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <Route path="/" exact component={DashboardPage}/>
                <Route path="/login" exact component={LoginFormPage}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Suspense>
    );
};

export default hot(module)(App);
