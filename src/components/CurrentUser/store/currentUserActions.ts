import { CurrentUser } from "../model/CurrentUser";
import { CurrentUserTypes } from "./currentUserTypes";

export const clearCurrentUser = () => ({
    type: CurrentUserTypes.CLEAR,
});

export const setCurrentUser = (user: CurrentUser) => ({
    type: CurrentUserTypes.SET,
    payload: user,
});

export type SetCurrentUserAction = ReturnType<typeof setCurrentUser>;
