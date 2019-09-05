import { Button, Icon, Layout, PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";
import { default as React, FC, ReactNode, useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer/Footer";
import SideMenu from "../../components/SideMenu/SideMenu";
import UserMenu from "./components/UserMenu/UserMenu";
import styles from "./defaultLayout.module.less";

interface DefaultLayoutProps {
    title: string;
    pageHeader?: Partial<PageHeaderProps> & { children?: ReactNode };
}

const {Header, Content} = Layout;

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

    const sideMenuTrigger = (
        <Button
            type="link"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Pokaż menu główne" : "Ukryj menu główne"}
        >
            <Icon
                type={`menu-${collapsed ? 'un' : ''}fold`}
                className={styles.siderTrigger}
            />
        </Button>
    );

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
                    {sideMenuTrigger}
                    <UserMenu />
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
