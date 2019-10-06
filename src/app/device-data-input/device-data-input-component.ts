import {Component, OnInit} from '@angular/core';
import {StepComponentAbstract} from "@lumen/client-angular";
import { DeviceDataInputConfigInterface} from "./device-data-input-config.interface";
import * as jsonPath from 'jsonpath/jsonpath';
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@Component(
    {
        templateUrl: './device-data-input-component.html',
        styleUrls: ['./device-data-input-component.scss']
    }
)

export class DeviceDataInputComponent extends StepComponentAbstract implements OnInit{
    public config:DeviceDataInputConfigInterface;
    public error = '';
    public isDisable:boolean = true;
    public data:any;

    public dataItems:any[] = [];

    constructor(private barcodeScanner: BarcodeScanner){
        super();
    }

    ngOnInit(): void {
      this.data = this.rootNode.getValue();
        if(this.config){
            let items = jsonPath.query(this.data, this.config.dataNodeName);
            this.dataItems = this.parseDataItems(items);
        } else {
            this.error = 'No Fields Configured';
            return;
        }
    }

    public onVerifyChange(event: any){
        if(event.target.value){
            this.isDisable = false;
        }else {
            this.isDisable = true;
            return;
        }
    }

    public submitForm():void{
        let node = this.rootNode.findNode(this.config.setNode);
        if(node){
            node.setValue(this.dataItems);
            this.submit.emit();
        }
    }

    private parseDataItems(dataItems: any[]):any[]{
        if(dataItems){
            for(let item of dataItems){
                if(item.itemQuantity){
                    item.itemSerialNumber = ''.repeat(parseInt(item.itemQuantity)).split('');
                }
            }
        }

        return dataItems;
    }

    public captureBarCode(i:any, xx:any): void {
        this.barcodeScanner.scan().then(barcodeData => {
            this.dataItems[xx][this.config.itemModel][i] = barcodeData.text;
            console.log('Barcode data', barcodeData);
        }).catch(err => {
            console.log('Error', err);
        });
    }
}
