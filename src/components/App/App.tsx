import React from 'react';
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "../LoginFormPage/LoginFormPage";
import PageNotFound from "../PageNotFound/PageNotFound";

const App: React.FC = () => {
    return (
        <Switch>
            <Route path="/login" component={LoginFormPage}/>
            <Route component={PageNotFound} />
        </Switch>
    );
};

export default hot(module)(App);
