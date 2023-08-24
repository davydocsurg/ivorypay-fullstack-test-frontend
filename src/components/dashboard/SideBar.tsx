import { Layout, Menu } from "antd";
import {
    UploadOutlined,
    UserOutlined,
    DashboardOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link

const { Sider } = Layout;

interface SideBarOpts {
    collapsed: boolean;
}

const SideBar: React.FC<SideBarOpts> = ({ collapsed }) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["dshindex"]}
                style={{
                    height: "100vh",
                }}
            >
                <Menu.Item
                    key="dshindex"
                    icon={<DashboardOutlined />}
                    style={{ marginTop: 100 }}
                >
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link to="/nav2">nav 2</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    <Link to="/nav3">nav 3</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SideBar;
