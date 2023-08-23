import * as Yup from "yup";

import { CustomGridFields } from "./CustomFields";

type FormProps = {
    fields?: CustomGridFields[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema?: Yup.ObjectSchema<any>;
};

export default FormProps;
