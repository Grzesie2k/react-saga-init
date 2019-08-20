import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { ComponentType } from "react";

export default function <Props>(history: History) {
    return (Component: ComponentType<Props>) => (props: Props) => (
        <ConnectedRouter history={history}>
            <Component {...props}/>
        </ConnectedRouter>
    );
}
