import { Layout } from "antd";
import * as React from "react";
import { CSSProperties, FC, useMemo } from "react";
import styles from "./blankLayout.module.css";

const {Content} = Layout;

interface BlankLayoutProps {
    /**
     * @default 300
     */
    width?: number | string;
}

const BlankLayout: FC<BlankLayoutProps> = (props) => {
    const contentStyle = useMemo((): CSSProperties => ({
        maxWidth: props.width || 300,
    }),[props.width]);

    return (
        <Layout className={styles.layout}>
            <Content style={contentStyle}>
                {props.children}
            </Content>
        </Layout>
    );
};

export default BlankLayout;
