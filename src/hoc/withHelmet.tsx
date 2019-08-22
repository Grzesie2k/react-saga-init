import * as React from "react";
import { ComponentType, FC } from "react";
import { HelmetProvider } from "react-helmet-async";

export default function <Props>(WrappedComponent: ComponentType<Props>) {
    const Component: FC<Props> = (props) => (
        <HelmetProvider>
            <WrappedComponent {...props}/>
        </HelmetProvider>
    );

    Component.displayName = `withHelmet(${WrappedComponent.displayName || WrappedComponent.name})`;

    return Component;
}
