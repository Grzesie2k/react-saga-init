import { StoreState } from "../../../store/StoreState";

export const getSessionToken = (state: StoreState) => state.session ? state.session.token : null;
export const hasSession = (store:StoreState) => store.session !== null;
