import {Pipe} from '@angular/core';

@Pipe({
    name: 'phoneNumber'
})

export class PhoneNumberFormatPipe {
    transform(number, args) {

        if (!number) { return ''; }

        number = String(number);
        number = number.replace(/[^0-9]*/g, '');
        var formattedNumber = number;

        var area = number.substring(0, 3);
        var front = number.substring(3, 6);
        var end = number.substring(6, number.length);

        if (front) {
            formattedNumber = ("(" + area + ") " + front);
        }
        if (end) {
            formattedNumber += ("-" + end);
        }
        return formattedNumber;
    }
}
