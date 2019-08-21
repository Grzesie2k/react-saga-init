import { SessionData } from "../model/SessionData";
import { SessionTypes } from "./sessionTypes";

export const startSession = (data: SessionData) => ({
    type: SessionTypes.START,
    payload: data,
});
export type StartSessionAction = ReturnType<typeof startSession>;

export const clearSession = () => ({
    type: SessionTypes.CLEAR,
});
