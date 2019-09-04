import { Drawer, Layout } from "antd";
import { CSSProperties, default as React, FC, useCallback } from "react";
import { Link } from "react-router-dom";
import useMedia from "use-media";
import styles from "../../layouts/DefaultLayout/defaultLayout.module.scss";
import MainMenu from "../MainMenu/MainMenu";

const {Sider} = Layout;

interface SideMenuProps {
    collapsed: boolean;

    setCollapsed(collapsed: boolean): void;
}

const SideMenu: FC<SideMenuProps> = ({collapsed, setCollapsed}) => {
    const isMobile = useMedia({maxWidth: 768}, false);
    const collapse = useCallback(() => setCollapsed(true), [setCollapsed]);

    return isMobile ? (
        <Drawer
            visible={!collapsed}
            onClose={collapse}
            bodyStyle={drawerBodyStyle}
            placement="left"
            closable={false}
        >
            <Link to="/">
                <h1 className={styles.logo}>react-init</h1>
            </Link>
            <MainMenu currentUrl="/"/>
        </Drawer>
    ) : (
        <Sider
            className={styles.sider}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            breakpoint="md"
            width={256}
            onBreakpoint={setCollapsed}
        >
            <Link to="/">
                <h1 className={styles.logo}>react-init</h1>
            </Link>
            <MainMenu currentUrl="/"/>
        </Sider>
    );
};

const drawerBodyStyle: CSSProperties = {
    padding: 0,
};

export default SideMenu;
