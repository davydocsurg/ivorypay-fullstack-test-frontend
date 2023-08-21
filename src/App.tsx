import { useState } from "react";
import { Input } from "./components";
import { UserOutlined } from "@ant-design/icons";

function App() {
    return (
        <>
            <Input name="name" label="Name" icon={<UserOutlined />} />
        </>
    );
}

export default App;
