import { Col, Row, Layout } from "antd";
import { FC, default as React } from "react";
import styles from "./footer.module.css";

const Footer: FC = () => (
    <Layout.Footer className={styles.footer}>
        <Row>
            <Col xs={12} className={styles.leftFooter}>
                &copy;{new Date().getFullYear()}
            </Col>
            <Col xs={12} className={styles.rightFooter}>
                {process.env.REACT_APP_VERSION}
            </Col>
        </Row>
    </Layout.Footer>
);

export default Footer;
