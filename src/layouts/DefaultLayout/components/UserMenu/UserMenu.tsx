import { Icon, Menu } from "antd";
import { default as React, FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../../components/CurrentUser/store/currentUserSelectors";
import { clearSession } from "../../../../components/Session/store/sessionActions";
import UserAvatar from "../../../../components/UserAvatar/UserAvatar";
import styles from "./userMenu.module.less";

const UserMenu: FC = () => {
    const dispatch = useDispatch();
    const logout = useCallback(() => dispatch(clearSession()), [dispatch]);

    const currentUser = useSelector(getCurrentUser);

    if (!currentUser) {
        return null;
    }

    const avatar = (
        <UserAvatar
            userId={currentUser.userId}
            name={currentUser.name}
            surname={currentUser.surname}
        />
    );

    return (
        <Menu mode="horizontal" selectedKeys={[]} className={styles.menu}>
            <Menu.SubMenu title={avatar}>
                <Menu.Item disabled>
                    Witaj, {currentUser.surname} {currentUser.name} &lt;{currentUser.email}>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={logout}>
                    <Icon type="logout"/>
                    <span>Wyloguj</span>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default UserMenu;
