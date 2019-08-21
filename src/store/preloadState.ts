import { DeepPartial } from "redux";
import sessionPersister from "../components/Session/services/sessionPersister";
import { StoreState } from "./StoreState";

export default (): DeepPartial<StoreState> => ({
    session: sessionPersister.read(),
});
