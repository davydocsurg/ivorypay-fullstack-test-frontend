import { Card, Col, Typography } from "antd";
import React, { useCallback, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input } from "../../../components";
import { Form } from "@unform/web";
import { useForm } from "../../../commons/form";
import { emailSchema } from "../../guests/validations";
import { useManageUsers } from "../../../context";
import { httpStatus } from "../../../constants";
import { Toast } from "../../../utils";
import { errorHandler } from "../../../services";

const { Title } = Typography;

interface AdminEmails {
    email: string;
}

const InviteAdmin: React.FC = () => {
    const form = useForm({ schema: emailSchema });
    const { inviteAdmin } = useManageUsers();
    const [loading, setLoading] = useState(false);

    const handleAdminInvitation = useCallback(
        async (data: AdminEmails) => {
            const toast = new Toast();
            try {
                toast.loading("Processing...");
                setLoading(true);

                const emails = [data.email];

                const res = await inviteAdmin(emails);
                await form.validation(data);
                if (res === httpStatus.OK) {
                    form.clear();
                    toast.success("Invitation sent successfully!");
                    setLoading(false);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                const { message } = errorHandler(error);
                toast.error(message);
                setLoading(false);
            }
        },
        [form, inviteAdmin]
    );

    return (
        <>
            <Title level={4}>Invite a user as Admin</Title>

            <Col lg={8} xl={8}>
                <Card>
                    <Form ref={form.ref} onSubmit={handleAdminInvitation}>
                        <Input
                            label="Email"
                            type="email"
                            required={true}
                            name="email"
                            icon={<UserOutlined />}
                        />

                        <div className="mt-5">
                            <Button
                                loading={loading}
                                type="submit"
                                text="Invite"
                            />
                        </div>
                    </Form>
                </Card>
            </Col>
        </>
    );
};

export default InviteAdmin;
