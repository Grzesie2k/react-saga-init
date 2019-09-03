import { Icon, Layout, Menu, PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";
import { default as React, FC, ReactNode, useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import SideMenu from "../../components/SideMenu/SideMenu";
import styles from "./defaultLayout.module.scss";

interface DefaultLayoutProps {
    title: string;
    pageHeader?: Partial<PageHeaderProps> & {children?: ReactNode};
}

const {Header, Content, Sider} = Layout;

const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const toggleCollapsed = useCallback(() => setCollapsed(!collapsed), [setCollapsed, collapsed]);
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
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <Sider className={styles.sider} collapsed={collapsed} onCollapse={setCollapsed}>
                <Link to="/">
                    <h1 className={styles.logo}>react-init</h1>
                </Link>
                <SideMenu currentUrl="/"/>
            </Sider>
            <Layout>
                <Header className={styles.header}>
                    <Icon
                        type={`menu-${collapsed ? 'un' : ''}fold`}
                        onClick={toggleCollapsed}
                        className={styles.siderTrigger}
                    />
                    <Menu mode="horizontal" selectedKeys={[]} className={styles.topMenu}>
                        <Menu.Item>
                            <Icon type="notification"/>
                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="user"/>
                        </Menu.Item>
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
