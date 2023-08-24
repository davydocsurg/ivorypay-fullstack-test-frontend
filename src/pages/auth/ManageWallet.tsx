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
import { depositAmountSchema } from "../guests/validations";
import { useForm } from "../../commons/form";
import { Input } from "../../components";
import { Form } from "@unform/web";
import { Button as TBtn } from "../../components";

const { Title } = Typography;

interface Deposit {
    amount: number;
}

const ManageWallet: React.FC = () => {
    const depositForm = useForm({ schema: depositAmountSchema });
    const wallet = getAuthUserWallet();
    const { createWallet, depositAmount } = useManageWallet();
    const [loading, setLoading] = useState(false);
    const [depositing, setDepositing] = useState(false);

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
                toast.loading("Creating wallet...");
                setDepositing(true);

                const amount = data.amount;

                const res = await depositAmount(amount);
                if (res === httpStatus.OK) {
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
        [depositAmount]
    );

    return (
        <>
            <Title>Manage Wallet</Title>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
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

                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card>
                        <Title level={5}>Deposit Funds</Title>
                        <Form ref={depositForm.ref} onSubmit={handleDeposit}>
                            <Input
                                label="Enter Amount"
                                name="amount"
                                icon={<WalletOutlined />}
                                placeholder="50.00"
                                type="number"
                                style={{ marginBottom: 5 }}
                            />
                            <TBtn
                                text="Deposit"
                                type="submit"
                                loading={depositing}
                            />
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ManageWallet;
