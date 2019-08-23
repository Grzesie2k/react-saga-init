import { Col, Layout, Row } from "antd";
import * as React from "react";
import { CSSProperties, FC, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./blankLayout.module.css";

const {Content, Footer} = Layout;

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
            <div>
                <Content style={contentStyle}>
                    {props.children}
                </Content>
                <Footer className={styles.footer}>
                    <Row>
                        <Col xs={12} className={styles.leftFooter}>
                            &copy;{new Date().getFullYear()}
                        </Col>
                        <Col xs={12} className={styles.rightFooter}>
                            {process.env.REACT_APP_VERSION}
                        </Col>
                    </Row>
                </Footer>
            </div>
        </Layout>
    );
};

export default BlankLayout;
