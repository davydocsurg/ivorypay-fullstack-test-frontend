import { Table, Typography, Col, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useManageUsers } from "../../../context";
import { User } from "../../../types";
import { Toast } from "../../../utils";
import { errorHandler } from "../../../services";
import { httpStatus } from "../../../constants";

const { Title } = Typography;

const ManageUsers: React.FC = () => {
    const { users, fetchUsers, disableUser, enableUser } = useManageUsers();
    const [loading, setLoading] = useState(false);

    const toast = new Toast();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleEnableUser = async (email: string) => {
        try {
            toast.loading("Enabling user...");
            setLoading(true);
            const res = await enableUser(email);
            if (res === httpStatus.OK) {
                toast.success("User enabled successfully!");
            }
            setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { message } = errorHandler(error);
            toast.error(message);
            setLoading(false);
        }
    };

    const handleDisableUser = async (email: string) => {
        try {
            toast.loading("Disabling user...");
            setLoading(true);
            const res = await disableUser(email);
            if (res === httpStatus.OK) {
                toast.success("User disabled successfully!");
            }
            setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { message } = errorHandler(error);
            toast.error(message);
            setLoading(false);
        }
    };

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

    const userColums = [
        {
            title: "Name",
            key: "name",
            render: (record: User) => `${record.firstName} ${record.lastName}`,
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
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (_: any, record: User) => (
                <UserActions
                    loading={loading}
                    record={record}
                    onEnable={() => handleEnableUser(record.email)}
                    onDisable={() => handleDisableUser(record.email)}
                />
            ),
        },
    ];

    const dataSource: User[] = users.map((user: User) => ({
        id: user.id,
        key: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
    }));

    return (
        <>
            <PageTitle />
            <Table
                pagination={{ pageSize: 20 }}
                dataSource={dataSource}
                columns={userColums}
            />
        </>
    );
};

const PageTitle: React.FC = () => {
    return <Title>Manage Users</Title>;
};

const UserActions = ({
    loading,
    record,
    onEnable,
    onDisable,
}: {
    loading: boolean;
    record: User;
    onEnable: () => void;
    onDisable: () => void;
}) => {
    const { isActive } = record;

    const handleEnable = () => {
        onEnable(); // Call the parent's enable handler
    };

    const handleDisable = () => {
        onDisable(); // Call the parent's disable handler
    };

    return (
        <div>
            {isActive ? (
                <Button
                    type="primary"
                    disabled={loading}
                    danger
                    onClick={handleDisable}
                >
                    Disable
                </Button>
            ) : (
                <Button onClick={handleEnable}>Enable</Button>
            )}
        </div>
    );
};

export default ManageUsers;
