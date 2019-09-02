import React from 'react';
import { hot } from "react-hot-loader";
import LoginFormPage from "../LoginFormPage/LoginFormPage";

const App: React.FC = () => {
    return (
        <LoginFormPage/>
    );
};

export default hot(module)(App);
