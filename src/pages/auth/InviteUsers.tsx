import { Card, Col, Typography } from "antd";
import React, { useCallback, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input } from "../../components";
import { Form } from "@unform/web";
import { useForm } from "../../commons/form";
import { emailSchema } from "../guests/validations";
import { useManageUsers } from "../../context";
import { httpStatus } from "../../constants";
import { Toast } from "../../utils";
import { errorHandler } from "../../services";

const { Title } = Typography;

interface UserEmails {
    emails: string;
}

const InviteUsers: React.FC = () => {
    const form = useForm({ schema: emailSchema });
    const { inviteUsers } = useManageUsers();
    const [loading, setLoading] = useState(false);

    const handleUsersInvitation = useCallback(
        async (data: UserEmails) => {
            const toast = new Toast();
            try {
                toast.loading("Processing...");
                setLoading(true);

                const emails = data.emails
                    .split(",")
                    .map((email) => email.trim());

                const res = await inviteUsers(emails);
                if (res === httpStatus.OK) {
                    form.clear();
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
        [form, inviteUsers]
    );

    return (
        <>
            <Title level={4}>Invite Users</Title>

            <Col lg={24} xl={24}>
                <Card>
                    <Form ref={form.ref} onSubmit={handleUsersInvitation}>
                        <Input
                            label="Email(s)"
                            type="text"
                            name="emails"
                            required={true}
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

export default InviteUsers;
