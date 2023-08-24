import { Button, Card, Col, Row, Typography } from "antd";
import {
    UserOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
    WalletOutlined,
} from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import { getAuthUserWallet, httpStatus } from "../../constants";
import { useManageWallet } from "../../context";
import { Toast } from "../../utils";
import { errorHandler } from "../../services";
import { depositAmountSchema, tFundsSchema } from "../guests/validations";
import { useForm } from "../../commons/form";
import { Input } from "../../components";
import { Form } from "@unform/web";
import { Button as TBtn } from "../../components";

const { Title } = Typography;

interface Deposit {
    amount: number;
}

interface TransferFunds extends Deposit {
    recipientEmail: string;
}

const ManageWallet: React.FC = () => {
    const depositForm = useForm({ schema: depositAmountSchema });
    const transferForm = useForm({ schema: tFundsSchema });
    const wallet = getAuthUserWallet();
    const { createWallet, depositAmount, transferFunds } = useManageWallet();
    const [loading, setLoading] = useState(false);
    const [depositing, setDepositing] = useState(false);
    const [transfering, setTransfering] = useState(false);

    const handleCreateWallet = useCallback(async () => {
        const toast = new Toast();
        try {
            toast.loading("Creating wallet...");
            setLoading(true);
            const res = await createWallet();
            if (res === httpStatus.OK) {
                toast.dismiss();
                toast.success("Wallet created successfully!");
                setLoading(false);
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { message } = errorHandler(error);
            toast.error(message);
            setLoading(false);
            toast.dismiss();
        }
    }, [createWallet]);

    const handleDeposit = useCallback(
        async (data: Deposit) => {
            const toast = new Toast();
            try {
                toast.loading("Processing...");
                setDepositing(true);

                await depositForm.validation(data);
                const amount = data.amount;

                const res = await depositAmount(amount);
                if (res === httpStatus.OK) {
                    depositForm.clear();
                    toast.dismiss();
                    toast.success("Your wallet has been funded successfully!");
                    setDepositing(false);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                const { message } = errorHandler(error);
                toast.error(message);
                setDepositing(false);
            }
        },
        [depositAmount, depositForm]
    );

    const handleTransferFunds = useCallback(
        async (data: TransferFunds) => {
            const toast = new Toast();
            try {
                toast.loading("Processing...");
                setTransfering(true);

                const res = await transferFunds(data);
                if (res === httpStatus.OK) {
                    toast.success(
                        "Your transfer was successful! Check your email for more details."
                    );
                    setTransfering(false);
                    toast.dismiss();
                }
                transferForm.clear();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                const { message } = errorHandler(error);
                toast.error(message);
                setTransfering(false);
                toast.dismiss();
            }
        },
        [transferForm, transferFunds]
    );

    return (
        <>
            <Title>Manage Wallet</Title>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card>
                        {wallet.address ? (
                            <>
                                <Title level={5}>Wallet Address:</Title>
                                <Title level={5}>{wallet.address}</Title>
                            </>
                        ) : (
                            <Button
                                disabled={loading}
                                onClick={handleCreateWallet}
                            >
                                {loading ? "Creating..." : "Create Wallet"}
                            </Button>
                        )}
                    </Card>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card>
                        <Title level={5}>Deposit Funds</Title>
                        <Form ref={depositForm.ref} onSubmit={handleDeposit}>
                            <Input
                                label="Enter Amount"
                                name="amount"
                                icon={<WalletOutlined />}
                                placeholder="50.00"
                                type="number"
                                style={{ marginBottom: 10 }}
                            />
                            <TBtn
                                text="Deposit"
                                type="submit"
                                loading={depositing}
                            />
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card>
                        <Title level={5}>Transfer Funds</Title>
                        <Form
                            ref={transferForm.ref}
                            onSubmit={handleTransferFunds}
                        >
                            <Input
                                label="Enter Amount"
                                name="amount"
                                icon={<WalletOutlined />}
                                placeholder="50.00"
                                type="number"
                                style={{ marginBottom: 10 }}
                            />
                            <Input
                                label="Recipient Email"
                                name="recipientEmail"
                                icon={<UserOutlined />}
                                placeholder="john@example.com"
                                type="email"
                                style={{ marginBottom: 10 }}
                            />
                            <TBtn
                                text="Transfer"
                                type="submit"
                                loading={transfering}
                            />
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ManageWallet;
