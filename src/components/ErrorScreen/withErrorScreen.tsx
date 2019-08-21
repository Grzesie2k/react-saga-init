import * as React from "react";
import { ComponentType, FC } from "react";
import ErrorScreenContainer from "./ErrorScreenContainer";

export default function <Props>(WrappedComponnet: ComponentType<Props>) {
    const Component: FC<Props> = (props) => (
        <ErrorScreenContainer>
            <WrappedComponnet {...props}/>
        </ErrorScreenContainer>
    );

    Component.displayName = `withErrorScreen(${Component.displayName || Component.name})`;

    return Component;
}
