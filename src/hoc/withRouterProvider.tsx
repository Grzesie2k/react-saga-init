import * as React from "react";
import { ComponentType } from "react";
import { Router } from "react-router";
import { History } from "history";

export default function <Props>(history: History) {
    return (WrappedComponent: ComponentType<Props>) => {
        const Component: ComponentType<Props> = (props) => (
            <Router history={history}>
                <WrappedComponent {...props}/>
            </Router>
        );

        Component.displayName = `withRouterProvider(${WrappedComponent.displayName || WrappedComponent.name})`;

        return Component;
    };
}
