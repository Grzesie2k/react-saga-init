import * as React from "react";
import { ComponentType } from "react";
import { Router } from "react-router";
import {History} from "history";

export default function <Props>(history: History) {
    return (Component: ComponentType<Props>) => (props: Props) => (
        <Router history={history}>
            <Component {...props}/>
        </Router>
    );
}
