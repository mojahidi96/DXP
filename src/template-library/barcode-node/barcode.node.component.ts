import { Component } from '@angular/core';


import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {NodeComponentAbstract} from '@lumen/client-angular';

@Component({
    styleUrls: ['./barcode-node.scss'],
    templateUrl: './barcode-node.html',
})
export class BarcodeNodeComponent extends NodeComponentAbstract {
    public error = false;
    scannedCode: string;

    constructor(private barcodeScanner: BarcodeScanner) {
        super();
    }

    public captureBarCode(): void {
        this.barcodeScanner.scan().then(barcodeData => {
            this.scannedCode = barcodeData.text;
            console.log('Barcode data', barcodeData);
        }).catch(err => {
            console.log('Error', err);
        });
    }
}
