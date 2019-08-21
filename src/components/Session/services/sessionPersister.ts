import { SessionData } from "../model/SessionData";

const sessionKey = "session";

export default Object.freeze({
    clear(): void {
        window.sessionStorage.removeItem(sessionKey);
    },
    write(data: SessionData): void {
        window.sessionStorage.setItem(sessionKey, data.token);
    },
    read(): SessionData | null {
        const token = window.sessionStorage.getItem(sessionKey);
        if (null == token) {
            return null;
        }

        return {token};
    }
});
