import * as React from "react";
import { ComponentType, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../http";
import { clearSession, startSession } from "../components/Session/store/sessionActions";
import { getSessionToken } from "../components/Session/store/sessionSelectors";

export default function <Props>(WrappedComponent: ComponentType<Props>) {
    const Component: FC<Props> = (props) => {
        const token = useSelector(getSessionToken);
        const dispatch = useDispatch();

        useEffect(() => {
            const interceptorId = http.interceptors.response.use(
                (response) => {
                    const token = response.headers['X-Auth-Token'];
                    if (token) {
                        dispatch(startSession({token}))
                    }

                    return response;
                },
                (error) => {
                    if (error.response && error.response.status === 401) {
                        dispatch(clearSession());
                    }

                    return Promise.reject(error)
                }
            );

            return () => {
                http.interceptors.response.eject(interceptorId);
            };
        }, [dispatch]);

        useEffect(() => {
            if (null != token) {
                http.defaults.headers['Authorization'] = `Bearer ${token}`;
            } else {
                delete http.defaults.headers['Authorization'];
            }

            return () => {
                http.defaults.headers['Authorization'] = undefined;
            };

        }, [token]);

        return <WrappedComponent {...props}/>;
    };

    Component.displayName = `withHttpSessionProvider(${WrappedComponent.displayName || WrappedComponent.name})`;

    return Component;
}
