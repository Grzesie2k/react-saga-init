import * as React from "react";
import { ComponentType, FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/StoreState";
import ErrorScreen from "./ErrorScreen";
import { ErrorScreenType } from "./model/ErrorScreenType";
import { hideErrorScreen, showErrorScreen } from "./store/errorScreenActions";

export default function <Props>(WrappedComponnet: ComponentType<Props>) {
    const Component: FC<Props> = (props) => {
        const error = useSelector<StoreState, ErrorScreenType | null>((state) => state.errorScreen);

        const dispatch = useDispatch();
        const showError = useCallback((type: ErrorScreenType) => {
            dispatch(showErrorScreen(type));
        }, [dispatch]);

        const hideError = useCallback(() => {
            dispatch(hideErrorScreen());
        }, [dispatch]);

        return (
            <ErrorScreen error={error} hideError={hideError} showError={showError}>
                <WrappedComponnet {...props}/>
            </ErrorScreen>
        );
    };

    Component.displayName = `withErrorScreen(${Component.displayName || Component.name})`;

    return Component;
}
