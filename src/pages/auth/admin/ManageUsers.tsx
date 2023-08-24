import { Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useManageUsers } from "../../../context";

const { Title } = Typography;

const userColums = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
];

const dataSource = [
    {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
    },
    {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
    },
];

const ManageUsers: React.FC = () => {
    const { users, fetchUsers } = useManageUsers();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Title>Manage Users</Title>

            <Table dataSource={dataSource} columns={userColums} />
        </>
    );
};

export default ManageUsers;
