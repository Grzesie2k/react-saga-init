import { StoreState } from "../../StoreState";

export const getCurrentPathname = (store: StoreState) => store.router.location.pathname;
