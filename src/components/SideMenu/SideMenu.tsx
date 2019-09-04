import { Layout } from "antd";
import { default as React, FC } from "react";
import { Link } from "react-router-dom";
import styles from "../../layouts/DefaultLayout/defaultLayout.module.scss";
import MainMenu from "../MainMenu/MainMenu";

const {Sider} = Layout;

interface SideMenuProps {
    collapsed: boolean;

    setCollapsed(collapsed: boolean): void;
}

const SideMenu: FC<SideMenuProps> = ({collapsed, setCollapsed}) => {
    return (
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

export default SideMenu;
