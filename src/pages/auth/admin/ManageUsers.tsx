import { Table, Typography, Empty, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useManageUsers } from "../../../context";
import { User } from "../../../types";

const { Title } = Typography;

const userColums = [
    {
        title: "Name",
        dataIndex: "fullName", // Use a computed property for full name
        key: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Status",
        dataIndex: "isActive",
        key: "status",
        render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
];

const ManageUsers: React.FC = () => {
    const { users, fetchUsers } = useManageUsers();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (!Array.isArray(users)) {
        return (
            <Col
                style={{
                    textAlign: "center",
                }}
            >
                <PageTitle />

                <LoadingOutlined
                    style={{
                        textAlign: "center",
                        fontSize: 50,
                        marginTop: "30vh",
                    }}
                />
            </Col>
        );
    }

    const dataSource = users?.map((user: User) => ({
        key: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
    }));

    return (
        <>
            <PageTitle />
            <Table dataSource={dataSource} columns={userColums} />
        </>
    );
};

const PageTitle: React.FC = () => {
    return <Title>Manage Users</Title>;
};

export default ManageUsers;
