import { ConfigProvider } from "antd";
import pl_PL from 'antd/es/locale/pl_PL';
import * as React from "react";
import { ComponentType } from "react";
import "moment/locale/pl";
import moment from "moment";

moment.locale("pl");

export default function <Props>(WrappedComponent: ComponentType<Props>) {
    const Component: ComponentType<Props> = (props) => (
        <ConfigProvider locale={pl_PL} autoInsertSpaceInButton>
            <WrappedComponent {...props}/>
        </ConfigProvider>
    );

    Component.displayName = `withAntdConfig(${WrappedComponent.displayName || WrappedComponent.name})`;

    return Component;
}
