import React from "react";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const { Title } = Typography;

const Dashboard: React.FC = () => {
    return (
        <>
            <Title>Welcome back!</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card bordered={true} style={{ textAlign: "center" }}>
                        <UserOutlined size={10} />
                        <Title level={4}>Manage Users</Title>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card bordered={false}>Card content</Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card bordered={false}>Card content</Card>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
