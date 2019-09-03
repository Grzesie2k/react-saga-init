import { Alert, Button, Form, Icon, Input } from "antd";
import Checkbox from "antd/es/checkbox";
import { FormComponentProps } from "antd/lib/form";
import { push } from "connected-react-router";
import * as React from "react";
import { FC, FormEvent, useCallback, useState } from "react";
import { batch, useDispatch } from "react-redux";
import { emailRule, requiredRule } from "../../validationRules";
import { startSession } from "../Session/store/sessionActions";
import styles from "./loginForm.module.css";

const LoginForm: FC<FormComponentProps> = ({form}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
    const onSubmit = useCallback((event: FormEvent) => form.validateFields((errors, values) => {
        event.preventDefault();
        if (errors) return;
        setLoading(true);
        setInvalidCredentials(false);
        setLoading(false);
        const token = btoa(`${values.email}:${values.password}`);
        batch(() => {
            dispatch(startSession({token}));
            dispatch(push("/"));
        });
    }), [form, dispatch, setLoading, setInvalidCredentials]);

    return (
        <Form onSubmit={onSubmit}>
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
                        readOnly={loading}
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
                        readOnly={loading}
                    />
                )}
            </Form.Item>
            <Form.Item className={styles.actions}>
                {form.getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true,
                })(
                    <Checkbox disabled={loading}>Zapmiętaj mnie</Checkbox>
                )}
                <a className={styles.forgot} href="/">
                    Przypomnij hasło
                </a>
                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.button}
                    loading={loading}
                >
                    Zaloguj się
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Form.create()(LoginForm);
