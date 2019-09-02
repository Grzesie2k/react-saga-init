import { Alert, Button, Form, Icon, Input } from "antd";
import Checkbox from "antd/es/checkbox";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { FC } from "react";
import { emailRule, requiredRule } from "../../validationRules";
import styles from "./loginForm.module.css";

interface LoginFormStateProps {
    invalidCredentials: boolean;
}

type LoginFormProps = LoginFormStateProps & FormComponentProps;

const LoginForm: FC<LoginFormProps> = ({form, invalidCredentials}) => {
    return (
        <Form>
            {invalidCredentials ? (
                <Alert
                    className={styles.message}
                    showIcon
                    type="error"
                    message="Niepoprawne dane logowania"
                    closable
                />
            ) : null}
            <Form.Item>
                {form.getFieldDecorator("email", {
                    rules: [requiredRule, emailRule],
                })(
                    <Input
                        type="email"
                        autoComplete="username"
                        placeholder="Adres e-mail"
                        prefix={<Icon type="user"/>}
                    />
                )}
            </Form.Item>
            <Form.Item>
                {form.getFieldDecorator("password", {
                    rules: [requiredRule]
                })(
                    <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Hasło"
                        prefix={<Icon type="lock"/>}
                    />
                )}
            </Form.Item>
            <Form.Item className={styles.actions}>
                {form.getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true,
                })(
                    <Checkbox>Zapmiętaj mnie</Checkbox>
                )}
                <a className={styles.forgot} href="/">
                    Przypomnij hasło
                </a>
                <Button type="primary" htmlType="submit" className={styles.button}>
                    Zaloguj się
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Form.create<LoginFormProps>()(LoginForm);
