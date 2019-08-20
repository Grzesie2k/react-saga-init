import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { ComponentType } from "react";

export default function <Props>(history: History) {
    return (WrappedComponent: ComponentType<Props>) => {
        const Component: ComponentType<Props> = (props) => (
            <ConnectedRouter history={history}>
                <WrappedComponent {...props}/>
            </ConnectedRouter>
        );

        Component.displayName = `withConnectedRouter(${WrappedComponent.displayName || WrappedComponent.name})`;

        return Component;
    }
}
