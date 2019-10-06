/**
 * Created by adil0001 on 11/15/2018.
 */
import {Pipe} from '@angular/core';

@Pipe({
    name: 'ssnNumber'
})

export class SsnNumberFormatPipe {
    transform(number, args) {

        if (!number) { return ''; }

        number = String(number);
        number = number.replace(/[^0-9]*/g, '');
        var formattedNumber = number;

        var area = number.substring(0, 3);
        var front = number.substring(3, 5);
        var end = number.substring(5, number.length);

        if (end) {
            formattedNumber = (area + "-" + front + "-" + end);
        }

        return formattedNumber;
    }
}
