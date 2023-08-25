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
    emails: string;
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

                const emails = data.emails
                    .split(",")
                    .map((email) => email.trim());

                const res = await inviteAdmin(emails);
                if (res === httpStatus.OK) {
                    toast.success("Invitation sent successfully!");
                    setLoading(false);
                }
                form.clear();
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

            <Col lg={24} xl={24}>
                <Card>
                    <Form ref={form.ref} onSubmit={handleAdminInvitation}>
                        <Input
                            label="Email(s)"
                            type="text"
                            required={true}
                            name="emails"
                            icon={<UserOutlined />}
                            size="large"
                            info="You can enter a list of email addresses, separated by commas."
                            placeholder="chi@example.com, john@example.com, gabriel@example.com"
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
