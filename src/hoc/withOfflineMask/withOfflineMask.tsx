import { Icon, Result } from "antd";
import { debounce } from "lodash";
import * as React from "react";
import { ComponentType, FC, useEffect, useState } from "react";
import styles from "./withOfflineMask.module.css";

export default function withOfflineMask<Props>(WrappedComponent: ComponentType<Props>) {
    const Component: FC<Props> = (props) => {
        const [onLine, setOnLineStatus] = useState(window.navigator.onLine);
        useEffect(() => {
            const wait = 1000;
            const setOnLine = debounce(() => setOnLineStatus(window.navigator.onLine), wait);

            window.addEventListener("online", setOnLine);
            window.addEventListener("offline", setOnLine);

            return () => {
                window.removeEventListener("online", setOnLine);
                window.removeEventListener("offline", setOnLine);
            };
        });

        if (onLine) {
            return <WrappedComponent {...props} />;
        }

        return (
           <>
               <WrappedComponent {...props} />
               <Result
                   className={styles.mask}
                   status="error"
                   icon={<Icon type="disconnect" />}
                   title="Utracono połączenie z serwerem"
                   subTitle="Sprawdź swoje połączenie z internetem i spróbuj ponownie."
               />
           </>
        );
    };

    Component.displayName = `withOfflineMask(${WrappedComponent.displayName || WrappedComponent.name})`;

    return Component;
}
