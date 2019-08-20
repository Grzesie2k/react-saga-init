import createStoreReducer from "./createStoreReducer";

type StoreReducer = ReturnType<typeof createStoreReducer>;

export type StoreState = ReturnType<StoreReducer>;
