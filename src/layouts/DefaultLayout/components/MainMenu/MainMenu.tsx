import { Icon, Menu } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";

interface MainMenuProps {
    currentUrl: string;
}

const MainMenu: FC<MainMenuProps> = (props) => {
    return (
        <Menu
            defaultSelectedKeys={['/']}
            selectedKeys={[props.currentUrl]}
            theme="dark"
        >
            <Menu.Item key="/">
                <Link to="/">
                    <Icon type="home"/>
                    <span>Strona główna</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default MainMenu;
