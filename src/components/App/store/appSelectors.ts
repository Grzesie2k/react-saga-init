import { StoreState } from "../../../store/StoreState";

export const getCurrentPathname = (store: StoreState) => store.router.location.pathname;
