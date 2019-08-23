import * as React from "react";
import { FC } from "react";
import BlankLayout from "../BlankLayout/BlankLayout";
import LoginForm from "./LoginForm";

const LoginFormPage: FC = () => {
    return (
        <BlankLayout title="Logowanie">
            <LoginForm/>
        </BlankLayout>
    );
};

export default LoginFormPage;
