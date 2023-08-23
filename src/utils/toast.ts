import { Id, ToastContent, ToastOptions, toast } from "react-toastify";

import Style from "./style";

export default class Toast {
    constructor(private id?: Id) {
        this.id = id;
    }

    public loading(
        content: ToastContent<unknown> = "Loading...",
        options?: ToastOptions<object> | undefined
    ) {
        this.id = toast.loading(content, options);

        return this;
    }

    public success(
        message: string = "Data sent successfully",
        options?: ToastOptions<object> | undefined
    ) {
        if (this.id) {
            return toast.update(this.id as Id, {
                ...Style.successUpdate(message),
                ...options,
            });
        }

        return toast.success(message, { ...Style.success, ...options });
    }

    public error(
        message: string = "Oops...Something went wrong. Check your credentials and try again",
        options?: ToastOptions<object> | undefined
    ) {
        if (this.id) {
            return toast.update(this.id as Id, {
                ...Style.errorUpdate(message),
                ...options,
            });
        }

        return toast.error(message, { ...Style.error, ...options });
    }

    public dismiss() {
        if (this.id) {
            return toast.dismiss(this.id as Id);
        }

        return toast.dismiss();
    }
}
