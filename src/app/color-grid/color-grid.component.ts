import { Component, ViewContainerRef, ViewChild } from '@angular/core';

import { UICarouselComponent } from 'ui-carousel/dist/src/ui-carousel/ui-carousel.component';
import { StepComponentAbstract } from '@lumen/client-angular';


@Component({
  templateUrl: 'color-grid.component.html',
  styleUrls: ['color-grid.component.scss'],
})
export class ColorGridComponent extends StepComponentAbstract{
  public config;
  public data;
  public colors:any;
  public color;
  public defaultSet = {
      'color':'selectedDeviceColor',
    //   'carrier':'selectedCarrier',
    //   'storage':'selectedStorage',
      'device':'selectedDevice'
  }
  selectedColor;
  public deviceSetObj =  "CommonFields.TradeIn.SelectedDeviceSummary";

  ngOnInit(){
    console.log(this.config)
    this.colors = this.fetchValue(this.rootNode.findNode(this.config.componentSelectionNode));
  }
  onsubmit(){
    this.submit.emit();
  }

  fetchValue(node){
    console.log(this.colors);
      return JSON.parse(node.initialValue);
  }

  setValue(type,value){
    let node = this.rootNode.findNode(`${this.deviceSetObj}.${this.defaultSet[type]}`);
    (node)?node.setValue(JSON.stringify(value)):'';
    (type === 'color')?this.selectedColor = value:'';
  }

  validate(){
      this.color = this.rootNode.findNode(`${this.deviceSetObj}.${this.defaultSet.color}`);
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
  }
}
