import { Layout, Menu } from "antd";
import {
    LogoutOutlined,
    UserOutlined,
    DashboardOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
    WalletOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { adminCheck } from "../../constants";
import { navbarLinks } from "../../services";
import { useAuth } from "../../context";

const { Sider } = Layout;

interface SideBarOpts {
    collapsed: boolean;
}

const SideBar: React.FC<SideBarOpts> = ({ collapsed }) => {
    const isAdmin = adminCheck();
    const { logout } = useAuth();

    const logoutMenu = {
        marginTop: 150,
        backgroundColor: "red",
        color: "white",
        borderRadius: "4px",
        fontWeight: "bold",
    };

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
                    <Link to={navbarLinks.dashboard}>Dashboard</Link>
                </Menu.Item>
                {isAdmin && (
                    <>
                        <Menu.Item key="manage-users" icon={<UserOutlined />}>
                            <Link to={navbarLinks.manageUsers}>
                                Manage Users
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key="invite-admin"
                            icon={<UserAddOutlined />}
                        >
                            <Link to={navbarLinks.inviteAdmin}>
                                Invite Admin
                            </Link>
                        </Menu.Item>
                    </>
                )}
                <Menu.Item key="invite-users" icon={<UsergroupAddOutlined />}>
                    <Link to={navbarLinks.inviteUsers}>Invite Users</Link>
                </Menu.Item>
                <Menu.Item key="manage-wallet" icon={<WalletOutlined />}>
                    <Link to={navbarLinks.manageWallet}>Manage Wallet</Link>
                </Menu.Item>
                <Menu.Item key="transactions" icon={<MoneyCollectOutlined />}>
                    <Link to={navbarLinks.wallets.transactions}>
                        Transactions
                    </Link>
                </Menu.Item>

                <Menu.Item
                    key="logout"
                    icon={<LogoutOutlined />}
                    style={{ ...logoutMenu }}
                    onClick={logout}
                >
                    Logout
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SideBar;
