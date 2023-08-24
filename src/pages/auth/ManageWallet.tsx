import { Button, Card, Col, Row, Typography } from "antd";
import React, { useCallback, useState } from "react";
import { getAuthUserWallet, httpStatus } from "../../constants";
import { useManageWallet } from "../../context";
import { Toast } from "../../utils";
import { errorHandler } from "../../services";

const { Title } = Typography;

const ManageWallet: React.FC = () => {
    const wallet = getAuthUserWallet();
    const { createWallet } = useManageWallet();
    const [loading, setLoading] = useState(false);

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
            </Row>
        </>
    );
};

export default ManageWallet;
