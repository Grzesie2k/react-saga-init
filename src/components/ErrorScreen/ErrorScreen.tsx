import { Button, Result } from "antd";
import { AxiosResponse } from "axios";
import { Component, default as React } from "react";
import http from "../../http";
import { ErrorScreenType } from "./model/ErrorScreenType";
import styles from "./errorScreen.module.css";

export interface ErrorScreenStateProps {
    error: ErrorScreenType | null;
}

export interface ErrorScreenDetectorDispatchProps {
    showError(type: ErrorScreenType): void;

    hideError(): void;
}

export default class ErrorScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {renderError: false};
    }

    public componentDidMount(): void {
        window.addEventListener("unhandledrejection", this.errorListener);
        window.addEventListener("error", this.errorListener);

        const httpInterceptorId = http.interceptors.response.use(
            (response) => response,
            this.httpErrorResponseInterceptor
        );
        this.setState({httpInterceptorId});
    }

    public componentWillUnmount(): void {
        window.removeEventListener("unhandledrejection", this.errorListener);
        window.removeEventListener("error", this.errorListener);

        if (null != this.state.httpInterceptorId) {
            http.interceptors.response.eject(this.state.httpInterceptorId);
            this.setState({httpInterceptorId: undefined});
        }
    }

    public static getDerivedStateFromError(): State {
        return {renderError: true};
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.props.showError(ErrorScreenType.CLIENT_ERROR);
    }

    public render() {
        const {error, children} = this.props;
        const {renderError} = this.state;

        if (null === error && !renderError) {
            return children;
        }

        const reloadButton = (
            <Button
                type="primary"
                icon="reload"
                onClick={this.reload}
            >
                Uruchom aplikacje ponownie
            </Button>
        );

        const ignoreButton = process.env.NODE_ENV === "production" ? null : (
            <Button
                className={styles.close}
                type="dashed"
                icon="close"
                onClick={this.props.hideError}
            />
        );

        const buttons = <>{reloadButton} {ignoreButton}</>;

        switch (renderError ? ErrorScreenType.CLIENT_ERROR : error) {
            case ErrorScreenType.CLIENT_ERROR:
                return (
                    <Result
                        status="error"
                        title="Aplikacja przestała działać"
                        subTitle="Wystąpił nieobsługiwany wyjątek w aplikacji uniemożliwiający jej dalsze działanie."
                        extra={buttons}
                    />
                );
            case ErrorScreenType.SERVER_ERROR:
                return (
                    <Result
                        status="500"
                        title="Błąd serwera"
                        subTitle="Wystąpił problem z serwerem aplikacji."
                        extra={buttons}
                    />
                );
        }
    }

    private reload = () => document.location.reload();

    private errorListener = () => {
        this.props.showError(ErrorScreenType.CLIENT_ERROR);
    };

    private httpErrorResponseInterceptor = (error: {response?: AxiosResponse}) => {
        if (error.response && error.response.status >= 500) {
            this.props.showError(ErrorScreenType.SERVER_ERROR);
        }

        return Promise.reject(error);
    }
}

type Props = ErrorScreenStateProps & ErrorScreenDetectorDispatchProps;

interface State {
    renderError: boolean;
    httpInterceptorId?: number;
}
