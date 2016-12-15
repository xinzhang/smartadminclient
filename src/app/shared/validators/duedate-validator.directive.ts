import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

import * as moment from 'moment';

function DueDateValidatorFactory() {
    return (c: FormControl) => {
        console.log('dudatevalidatorfactory ' + c.value);

        var isSameAfter = moment(c.value, "DD/MM/YYYY").isSameOrAfter(moment());

        console.log('isSafeAfter ' + isSameAfter);

        return (isSameAfter ? null : {
            validateDueDate: {
                valid: false
            }
        });
    };
}

@Directive({
    selector: '[validateDueDate][ngModel], [validateDueDate][FormControl]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DueDateValidator), multi: true
        }
    ]
})
export class DueDateValidator {
    validator: Function;

    constructor() {
        this.validator = DueDateValidatorFactory();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }
}