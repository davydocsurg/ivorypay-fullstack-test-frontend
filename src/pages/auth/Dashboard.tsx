import React from "react";
import { Typography } from "antd";
import {
    UserOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { navbarLinks } from "../../services";
import { adminCheck } from "../../constants";

const { Title } = Typography;

const Dashboard: React.FC = () => {
    const isAdmin = adminCheck();
    return (
        <>
            <Title>Welcome back!</Title>
            <Row gutter={[16, 16]}>
                {isAdmin && (
                    <>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Link to={navbarLinks.manageUsers}>
                                <Card
                                    style={{
                                        textAlign: "center",
                                        backgroundColor: "royalblue",
                                        color: "white",
                                    }}
                                >
                                    <UserOutlined style={{ fontSize: 25 }} />
                                    <Title style={{ color: "white" }} level={4}>
                                        Manage Users
                                    </Title>
                                </Card>
                            </Link>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Link to={navbarLinks.inviteAdmin}>
                                <Card
                                    style={{
                                        textAlign: "center",
                                        backgroundColor: "gold",
                                    }}
                                >
                                    <UserAddOutlined style={{ fontSize: 25 }} />
                                    <Title level={4}>Invite Admin</Title>
                                </Card>
                            </Link>
                        </Col>
                    </>
                )}
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Link to={navbarLinks.inviteUsers}>
                        <Card
                            style={{
                                textAlign: "center",
                                backgroundColor: "navy",
                                color: "white",
                            }}
                        >
                            <UsergroupAddOutlined style={{ fontSize: 25 }} />
                            <Title style={{ color: "white" }} level={4}>
                                Invite Users
                            </Title>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
