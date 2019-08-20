import * as React from "react";
import { ComponentType } from "react";
import { Provider } from "react-redux";
import { AnyAction, Store } from "redux";

export default function <Props, Action = AnyAction>(store: Store<Action>) {
    return (WrappedComponent: ComponentType<Props>) => {
        const Component: ComponentType<Props> = (props) => (
            <Provider store={store}>
                <WrappedComponent {...props}/>
            </Provider>
        );

        Component.displayName = `withReduxProvider(${WrappedComponent.displayName || WrappedComponent.name})`;

        return Component;
    };
}
