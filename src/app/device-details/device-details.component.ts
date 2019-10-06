import { Component } from '@angular/core';
import { StepComponentAbstract } from '@lumen/client-angular';
@Component(
    {
        templateUrl: './device-details.component.html',
        styleUrls: ['./device-details.component.scss'],
    }
)

export class DeviceDetailsComponent extends StepComponentAbstract {
    public selectedDevice;
    constructor() { super(); }
    public data: any;
    public tradeInValue: any;
    ngOnInit(): void {
        let deviceDetailsNode = this.rootNode.findNode("CommonFields.TradeIn.SelectedDeviceSummary.selectedDevice");
        let tradeInValueNode = this.rootNode.findNode("CommonFields.TradeIn.SelectedDeviceSummary.selectedDeviceTradeInValue");

        if (deviceDetailsNode) {
            this.selectedDevice = JSON.parse(deviceDetailsNode.getValue());
        }
        if(tradeInValueNode){
            this.tradeInValue = tradeInValueNode.getValue();
        }
        if (!this.tradeInValue) {
            this.setTradeInValue(tradeInValueNode)
        }
    }
    setTradeInValue(tradeInValueNode:any) {
        if (tradeInValueNode && this.selectedDevice.devicePriceList) {
            tradeInValueNode.setValue(this.selectedDevice.devicePriceList[0].localCustomerDisplayPrice)
        }
    }
}
