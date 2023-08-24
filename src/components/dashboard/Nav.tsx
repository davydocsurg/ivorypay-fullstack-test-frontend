import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";

const { Header } = Layout;

interface NavOpts {
    colorBgContainer: string;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const Nav: React.FC<NavOpts> = ({
    colorBgContainer,
    collapsed,
    setCollapsed,
}) => {
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    );
};

export default Nav;
