import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

import * as moment from 'moment';

function DueDateValidatorFactory() {
    return (c: FormControl) => {
                
        if (c.value != null && c.value != "") {
            var isSameAfter = moment(c.value, "DD/MM/YYYY").isSameOrAfter(moment());

            return (isSameAfter ? null : {
                validateDueDate: {
                    valid: false
                }
            });
        }

        return null;
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