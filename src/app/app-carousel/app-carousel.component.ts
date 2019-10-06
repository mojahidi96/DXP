import { Component, Input, ViewChild } from '@angular/core';

import {StepComponentAbstract} from "@lumen/client-angular";
import { UICarouselComponent } from 'ui-carousel/dist/src/ui-carousel/ui-carousel.component';


@Component({
  templateUrl: 'app-carousel.component.html',
  styleUrls: ['app-carousel.component.scss'],
})
export class CarouselComponent extends StepComponentAbstract{
  public config;
  selectedDeviceName;
  selectedColor;
  public data;
  public devicedetails;
  public refineDeviceList;
  public defaultSet = {
    'color':'selectedDeviceColor',
  //   'carrier':'selectedCarrier',
  //   'storage':'selectedStorage',
    'device':'selectedDevice'
}
  public deviceSetObj =  "CommonFields.TradeIn.SelectedDeviceSummary";

  @ViewChild(UICarouselComponent) private uicarousel: UICarouselComponent;
  constructor(){
    super();
  }

  ngOnInit(){
    console.log(this.data);
    let ds = this.data["PhobioDevicesResponse"]["TradeInDeviceList"]
    this.devicedetails = ds;
    console.log(this.devicedetails);
    let rawDeviceList
    this.uicarousel.autoPlay= false;
    this.config.fields[0].propertyValue
    this.generateDevices(this.devicedetails);
  }
  ngOnDestroy(): void {
    clearInterval(this.uicarousel.interval);

}
setValue(type,value){
  let node = this.rootNode.findNode(`${this.deviceSetObj}.${this.defaultSet[type]}`);
  (node)?node.setValue(JSON.stringify(value)):'';
  (type === 'device')?this.selectedDeviceName = value.deviceTitle:(type === 'color')?this.selectedColor = value:'';
}

generateDevices(devicelist){
  let refineArray = [];
  let inval = 0;
  let devices = [];
  let carouselLength = devicelist.length/3;
  devicelist.forEach((element,index) => {
      if((index + 1) % 3 === 0){
          devices.push(element)
         refineArray.push({
             "id":inval,
             "devices":devices
         });
         devices =[];
         inval += 1;
        }else{
            if(index ===  devicelist.length -1){
                devices.push(element)
                refineArray.push({
                    "id":inval,
                    "devices":devices
                });
            }else{
            devices.push(element);
            }
        }
  });
 console.log(refineArray);
 this.refineDeviceList = refineArray;
}
}
