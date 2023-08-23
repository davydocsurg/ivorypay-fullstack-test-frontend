import React from "react";

import { FormHandles } from "@unform/core";

import FormHandler from "./FormHandler";
import FormProps from "./FormProps";

export function useForm(props: FormProps = {}) {
    const form = new FormHandler(React.useRef<FormHandles>(null), props);

    return form;
}
