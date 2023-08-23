import { RefObject } from "react";

import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { CustomGridFields } from "./CustomFields";

import { Toast } from "../../utils";

import { getValidationsErrors } from "../../utils";

import FormProps from "./FormProps";
import CSelectProps from "./CSelectProps";

interface IConfig {
    errorMessage?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema?: Yup.ObjectSchema<Record<string, any>>;
    abort?: boolean;
}

export default class FormHandler {
    constructor(ref: RefObject<FormHandles>, props: FormProps) {
        this.ref = ref;
        this.schema = props.schema;
        this.fields = props.fields;
    }

    ref: RefObject<FormHandles>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: Yup.ObjectSchema<Record<string, any>> | undefined;
    fields: CustomGridFields[] | undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async validation(dataValidation: any, config?: IConfig) {
        try {
            this.ref.current?.setErrors({});

            const schema =
                this.schema ??
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (config?.schema as Yup.ObjectSchema<Record<string, any>>);

            await schema.validate(dataValidation, {
                abortEarly: false,
            });

            return true;
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationsErrors(err);
                this.ref.current?.setErrors(errors);
                console.warn(errors[Object.keys(errors)[0]]);

                new Toast().error(errors[Object.keys(errors)[0]]);
            }
        }
    }

    getData() {
        return this.ref.current?.getData();
    }

    setData(data: object) {
        this.ref.current?.setData({
            ...this.getData(),
            ...data,
        });
    }

    clear() {
        function handleClearSelect(fld: CSelectProps) {
            if (fld.multiple || fld.check || fld.chip) {
                return [];
            }

            return "";
        }

        function handleClear(fields: CustomGridFields[] | undefined) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const objForm: { [key: string]: never[] | string | any } = {};

            fields?.forEach((field) => {
                const name = field.name as string;
                if (field.type === "select") {
                    objForm[name] = handleClearSelect(field as CSelectProps);
                }
            });

            return objForm;
        }

        this.ref.current?.reset();

        this.ref.current?.setData(handleClear(this.fields));
    }
}
