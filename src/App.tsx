import { useState } from "react";
import { Input, Select } from "./components";
import { UserOutlined } from "@ant-design/icons";

function App() {
    return (
        <>
            <Input name="name" label="Name" icon={<UserOutlined />} />
            <Select
                defaultValue="lucy"
                label="Select"
                name="select"
                options={[
                    { label: "Lucy", value: "lucy" },
                    { label: "Jack", value: "jack" },
                ]}
                style={{ width: 120 }}
            />
        </>
    );
}

export default App;
