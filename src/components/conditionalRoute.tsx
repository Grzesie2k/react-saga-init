import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { hasSession } from "./Session/store/sessionSelectors";

export const createConditionalRoute = (condition: () => boolean, redirectTo: string): FC<RouteProps> => {
    return (props) => {
        if (condition()) {
            return (
                <Route
                    {...props}
                    component={undefined}
                    render={() => <Redirect to={redirectTo} />}/>
            );
        }

        return <Route {...props} />;
    };
};

export const AuthRoute = createConditionalRoute(() => useSelector(hasSession), "/");
export const SecureRoute = createConditionalRoute(() => !useSelector(hasSession), "/login");
