import { Layout } from "antd";
import * as React from "react";
import { CSSProperties, FC, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer/Footer";
import styles from "./blankLayout.module.css";

const {Content} = Layout;

interface BlankLayoutProps {
    /**
     * @default 300
     */
    width?: number | string;
    title: string;
}

const BlankLayout: FC<BlankLayoutProps> = (props) => {
    const contentStyle = useMemo((): CSSProperties => ({
        maxWidth: props.width || 420,
    }), [props.width]);

    return (
        <Layout className={styles.layout}>
            <Helmet>
                <title>{props.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <Layout className={styles.wrapper}>
                <Content style={contentStyle}>
                    {props.children}
                </Content>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default BlankLayout;
