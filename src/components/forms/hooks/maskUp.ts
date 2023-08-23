import { Mask } from "../../../utils";

/**
 * Get the value of the input and mask it up
 *
 * @param e - event
 * @param mask - mask to be applied
 * @returns event with the value with the mask
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function maskUp(e: any, mask: string) {
    const value = e.target.value;

    const pureSize = Mask.getOnlyNumbers(mask);
    const specials = Mask.getOnlySpecials(value);

    if (Mask.MASK_ONLY_NUMBERS.includes(mask)) {
        e.target.maxLength = pureSize.length + specials.length;
    }

    e.target.value = Mask.applyMask(value, mask);

    return e;
}
