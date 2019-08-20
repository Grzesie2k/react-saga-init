import * as React from "react";
import { ComponentType } from "react";
import { Provider } from "react-redux";
import { AnyAction, Store } from "redux";

export default function withReduxProvider<Props, Action = AnyAction>(store: Store<Action>) {
    return (Component: ComponentType<Props>) => (props: Props) => (
        <Provider store={store}>
            <Component {...props}/>
        </Provider>
    );
}
