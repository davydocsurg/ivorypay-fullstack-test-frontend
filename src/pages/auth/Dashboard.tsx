import React, { useState } from "react";
import { Nav, SideBar } from "../../components/dashboard";
import { Layout, theme } from "antd";

const { Content } = Layout;

const Dashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <SideBar collapsed={collapsed} />
            <Layout>
                <Nav
                    colorBgContainer={colorBgContainer}
                    setCollapsed={setCollapsed}
                    collapsed={collapsed}
                />
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
