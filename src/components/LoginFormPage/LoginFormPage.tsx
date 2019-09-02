import { Card } from "antd";
import * as React from "react";
import { FC } from "react";
import BlankLayout from "../BlankLayout/BlankLayout";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./loginFormPage.module.css";

const LoginFormPage: FC = () => {
    return (
        <BlankLayout title="Logowanie">
            <Card title="Logowanie" className={styles.card}>
                <LoginForm invalidCredentials loading />
            </Card>
        </BlankLayout>
    );
};

export default LoginFormPage;
