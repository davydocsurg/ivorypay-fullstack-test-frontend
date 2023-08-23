import { Layout, Menu } from "antd";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";
const { Sider } = Layout;

interface SideBarOpts {
    collapsed: boolean;
}

const SideBar: React.FC<SideBarOpts> = ({ collapsed }) => {
    return (
        <>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <UserOutlined />,
                            label: "nav 1",
                        },
                        {
                            key: "2",
                            icon: <VideoCameraOutlined />,
                            label: "nav 2",
                        },
                        {
                            key: "3",
                            icon: <UploadOutlined />,
                            label: "nav 3",
                        },
                    ]}
                    style={{
                        height: "100vh",
                    }}
                />
            </Sider>
        </>
    );
};

export default SideBar;
