import { Component, OnInit } from '@angular/core';
import {NodeComponentAbstract, TranslationsService} from '@lumen/client-angular';


@Component({
    styleUrls: ['./credit-card-node.component.scss'],
    templateUrl: './credit-card-node.component.html',
})
export class CreditCardNodeComponent extends NodeComponentAbstract implements OnInit {
    public type = 'text';

    public defaultFormat = /(\d{1,4})/g;
    public cardDisp:any;
    public cards = [
        {
            type: 'maestro',
            patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
            format: this.defaultFormat,
            length: [12, 13, 14, 15, 16, 17, 18, 19],
            cvvLength: [3],
            luhn: true
        }, {
            type: 'forbrugsforeningen',
            patterns: [600],
            format: this.defaultFormat,
            length: [16],
            cvvLength: [3],
            luhn: true
        }, {
            type: 'dankort',
            patterns: [5019],
            format: this.defaultFormat,
            length: [16],
            cvvLength: [3],
            luhn: true
        }, {
            type: 'visa',
            patterns: [4],
            format: this.defaultFormat,
            length: [13, 16, 19],
            cvvLength: [3],
            luhn: true
        }, {
            type: 'mastercard',
            patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
            format: this.defaultFormat,
            length: [16],
            cvvLength: [3],
            luhn: true
        }, {
            type: 'amex',
            patterns: [34, 37],
            format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
            length: [15],
            cvvLength: [3, 4],
            luhn: true
        }, {
            type: 'dinersclub',
            patterns: [30, 36, 38, 39],
            format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
            length: [14],
            cvvLength: [3],
            luhn: true
        }, {
            type: 'discover',
            patterns: [60, 64, 65, 622],
            format: this.defaultFormat,
            length: [16],
            cvvLength: [3],
            luhn: true
        }, {
            type: 'unionpay',
            patterns: [62, 88],
            format: this.defaultFormat,
            length: [16, 17, 18, 19],
            cvvLength: [3],
            luhn: false
        }, {
            type: 'jcb',
            patterns: [35],
            format: this.defaultFormat,
            length: [16, 19],
            cvvLength: [3],
            luhn: true
        }
    ];


    constructor(private translationsService: TranslationsService) {
        super();
    }

    public ngOnInit(): void {
        if (!this.node.value && this.node.defaultKey) {
            this.node.value = this.translationsService.getTranslation(this.node.defaultKey);
        }
    }

    public static cards() {
        return this.cards;
    }

    public cardFromNumber(event:any) {
        this.cardDisp = "";
        let num = event.target.value;
        let card,
            p,
            pattern,
            ref;
        num = (num + '').replace(/\D/g, '');

        for (let i = 0, len = this.cards.length; i < len; i++) {
            card = this.cards[i];
            ref = card.patterns;

            for (let j = 0, len1 = ref.length; j < len1; j++) {
                pattern = ref[j];
                p = pattern + '';

                if (num.substr(0, p.length) === p) {
                    this.cardDisp = card.type;
                }
            }
        }
    }
}
