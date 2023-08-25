import { Table, Typography, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useManageWallet } from "../../context";
import { Transaction, Wallet } from "../../types";
import moment from "moment";

const { Title } = Typography;

const Transactions: React.FC = () => {
    const { transactions, fetchTransactions } = useManageWallet();

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    if (!Array.isArray(transactions)) {
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

    const columns = [
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },

        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Sender",
            dataIndex: "senderWallet",
            key: "senderWallet",
            render: (senderWallet: Wallet) => senderWallet.address,
        },
        {
            title: "Receiver",
            dataIndex: "receiverWallet",
            key: "receiverWallet",
            render: (receiverWallet: Wallet) => receiverWallet.address,
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
        },
    ];

    const dataSource: Transaction[] = transactions.map(
        (transaction: Transaction) => ({
            id: transaction.id,
            key: transaction.id,
            amount: transaction.amount,
            type: transaction.type,
            senderWallet: transaction.senderWallet,
            receiverWallet: transaction.receiverWallet,
            createdAt: moment(transaction.createdAt).format("MMM Do YY"),
        })
    );

    return (
        <>
            <PageTitle />
            <Table
                pagination={{ pageSize: 20 }}
                dataSource={dataSource}
                columns={columns}
            />
        </>
    );
};

const PageTitle: React.FC = () => {
    return <Title>Transaction History</Title>;
};

export default Transactions;
