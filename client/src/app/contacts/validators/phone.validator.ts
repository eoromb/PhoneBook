import { FormControl } from '@angular/forms';

export function validatePhone(c: FormControl) {
    const phoneRegExp = /(^\+?\d{1}-\d{3}-\d{3}-\d{4}$)|(^\+?\d{11}$)/;
    return phoneRegExp.test(c.value) ? null : {
        validatePhone: {
            valid: false
        }
    };
}
