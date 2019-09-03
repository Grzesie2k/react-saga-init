import { Icon, Menu } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";

interface SideMenuProps {
    currentUrl: string;
}

const SideMenu: FC<SideMenuProps> = (props) => {
    return (
        <Menu defaultSelectedKeys={['/']} selectedKeys={[props.currentUrl]} theme="dark">
            <Menu.Item key="/">
                <Link to="/">
                    <Icon type="home"/>
                    <span>Strona główna</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="/login">
                <Link to="/login">
                    <Icon type="user"/>
                    <span>Logowanie</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default SideMenu;
