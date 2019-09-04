import { Icon, Layout, Menu, PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";
import { default as React, FC, ReactNode, useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import CurrentUserAvatar from "../../components/CurrentUser/CurrentUserAvatar";
import Footer from "../../components/Footer/Footer";
import { clearSession } from "../../components/Session/store/sessionActions";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "./defaultLayout.module.less";

interface DefaultLayoutProps {
    title: string;
    pageHeader?: Partial<PageHeaderProps> & {children?: ReactNode};
}

const {Header, Content} = Layout;

const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const toggleCollapsed = useCallback(() => setCollapsed(!collapsed), [setCollapsed, collapsed]);
    const logout = useCallback(() => dispatch(clearSession()), [dispatch]);

    const pageHeader = props.pageHeader ? (
        <PageHeader
            title={props.title}
            {...props.pageHeader}
            className={`${styles.pageHeader} ${props.pageHeader.className}`}
        />
    ) : null;

    return (
        <Layout className={styles.layout}>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
           <SideMenu
               collapsed={collapsed}
               setCollapsed={setCollapsed}
           />
            <Layout>
                <Header className={styles.header}>
                    <Icon
                        type={`menu-${collapsed ? 'un' : ''}fold`}
                        onClick={toggleCollapsed}
                        className={styles.siderTrigger}
                    />
                    <Menu mode="horizontal" selectedKeys={[]} className={styles.topMenu}>
                        <Menu.Item aria-label="Powiadomienia">
                            <Icon type="notification"/>
                        </Menu.Item>
                        <Menu.SubMenu title={<CurrentUserAvatar />}>
                            <Menu.Item onClick={logout} aria-label="Menu użytkownika">
                                <Icon type="logout" />
                                <span>Wyloguj</span>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Header>
                <Content>
                    {pageHeader}
                    <div className={styles.content}>
                        {props.children}
                    </div>
                </Content>
                <Footer/>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
