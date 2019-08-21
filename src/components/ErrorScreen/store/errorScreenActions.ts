import { ErrorScreenType } from "../model/ErrorScreenType";
import { ErrorScreenTypes } from "./errorScreenTypes";

export const showErrorScreen = (type: ErrorScreenType) => ({
    type: ErrorScreenTypes.SHOW,
    payload: type,
});

export type ShowErrorScreenAction = ReturnType<typeof showErrorScreen>;

export const hideErrorScreen = () => ({
    type: ErrorScreenTypes.HIDE,
});
