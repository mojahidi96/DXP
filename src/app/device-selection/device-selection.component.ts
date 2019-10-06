import { Component, OnInit } from "@angular/core";
import { StepComponentAbstract } from "@lumen/client-angular";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { DeviceListConfigInterface } from "./device-selection.config.interface";
import { NavigationEnd, Router } from "@angular/router";
import * as jsonPath from "jsonpath/jsonpath";

// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  templateUrl: "./device-selection.component.html",
  styleUrls: ["./device-selection.component.scss"]
})
export class DeviceSelectionComponent extends StepComponentAbstract implements OnInit {

  public config: DeviceListConfigInterface;
  data: any;
  manufactureList: Array<any>;
  deviceList: Array<any>;
  allDeviceList: Array<any>;
  searchText: string;
  colorList: Array<any>;
  storageList: string[];
  selectedDeviceSummary: any = {};
  selectedDevice: any = {};
  manufactureItem: any;
  isDeviceDamagedList1 = ["Yes", "No"];
  isDeviceDamagedList2 = ["Yes", "No"];
  deviceCondition = "Damaged";
  carrierList: any;
  mockDeviceData: any;
  selectedDevicePriceObject: any;
  signaturePadNode: any;
  imageUrl: any;
  submitLabel;
  public defaultSet = {
    'color': 'selectedDeviceColor',
    'device': 'selectedDevice',
    'TradeInValue': 'selectedDeviceTradeInValue'
  }
  public deviceSetObj = "CommonFields.TradeIn.SelectedDeviceSummary";
  constructor(public snackBar1: MatSnackBar, public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.data = this.rootNode.getValue();
    // this.manufactureList = jsonPath.query(this.data, this.config.dataNodeName); // Uncomment if manufacturer api is use.
    // console.table(this.rootNode.findNode('PhobioDevicesResponse.TradeInDeviceList'));
    const submitnode = this.rootNode.findNode(this.config.submitLabel);
    if (submitnode) { this.submitLabel = submitnode.value; }


    // this.allDeviceList = this.rootNode.findNode();
    this.allDeviceList = this.data.PhobioDevicesResponse.TradeInDeviceList;
    this.imageUrl = this.rootNode.findNode(this.config.cmsUrl);
    const manufactureNodes = this.rootNode.findNode(this.config.nodeName2);   // Nodes holds mock data
    if (manufactureNodes) {
      this.mockDeviceData = {};
      for (const field of Object.keys(manufactureNodes["children"])) {
        if (manufactureNodes["children"][field].value) {
          this.mockDeviceData[field] = JSON.parse(manufactureNodes["children"][field].value);
        } else {
          console.log(manufactureNodes["children"][field]);
        }
      }
    }
    const manufacturerBrand = this.rootNode.findNode(this.config.nodeName3);
    if (manufacturerBrand) {
      this.selectedDeviceSummary.selectedManufacturer = this.capitalizeFirstLetter(manufacturerBrand.getValue());
      this.onDeviceSelect(this.selectedDeviceSummary.selectedManufacturer); // Default device list
    }

    if (this.deviceList.length > 0) {
      this.selectedDeviceSummary.selectedDeviceType = this.deviceList[0].category.category_Title;
    }

    this.selectedDeviceSummary.agreeToReturnPolicy = false;
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  onDeviceSelect(manufacturer: string) {               // Can be use to set manufacturer on user selection
    const requiredDeviceList = this.mockDeviceData.deviceFilterJson[manufacturer.toLowerCase()];
    this.deviceList = this.allDeviceList.filter((item) => {
      return requiredDeviceList.findIndex(x => x.slug == item.deviceBrand) > -1;
    });
  }

  onSubmit() {
    if (this.selectedDeviceSummary) {
      if (this.selectedDeviceSummary.damagedQuesAns1 && this.selectedDeviceSummary.damagedQuesAns2) {
        this.selectedDeviceSummary.damagedQuesAns1 = `${this.config.deviceConditionQuestion1}: ${this.selectedDeviceSummary.damagedQuesAns1}`;
        this.selectedDeviceSummary.damagedQuesAns2 = `${this.config.deviceConditionQuestion2}: ${this.selectedDeviceSummary.damagedQuesAns2}`;
      }
      const node = this.rootNode.findNode(this.config.nodeName1);
      if (node && this.config.fields) {
        const data = {};
        for (const field of this.config.fields) {
          // data[field.setVal] = this.selectedDeviceSummary[field.getVal]; // will uncomment
          if (field.setVal) {
            data[field.setVal] = this.selectedDeviceSummary[field.setVal];  // Did by mistak will change later
          }
        }
        data["selectedDevice"] = JSON.stringify(this.selectedDevice);
        node.setValue(data);
      }

      if (!this.rootNode.validate()) {
        this.submit.emit();
      } else {
        const config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack-bar-container'];
        this.snackBar1.open(this.config.validationMessage, '', config);
      }
    }
  }

  setDevice(device) {
    this.selectedDeviceSummary.selectedDevice = device.deviceTitle;
    this.selectedDevice = device;
    this.onSelectCondition(this.selectedDevice.devicePriceList[0].conditionName);
    this.setValue('device', this.selectedDevice);
  }

  onSelectCondition(item) {
    this.selectedDeviceSummary.selectedDeviceConditionName = item;
    const devicePrice = this.selectedDevice.devicePriceList.filter(x => x.conditionName == item)[0];
    this.selectedDeviceSummary.selectedDeviceCondition = devicePrice.productCondition;
    this.selectedDeviceSummary.selectedDeviceTradeInValue = devicePrice.localCustomerDisplayPrice; // Can be used to show price in cent
    this.selectedDevicePriceObject = this.extractMoney(devicePrice.localCustomerDisplayPrice);
    this.setValue('TradeInValue', this.selectedDeviceSummary.selectedDeviceTradeInValue);
  }

  getNode() {
    const node = this.rootNode.findNode(this.config.nodeName4);
    if (node) {
      return node;
    }
    return false;
  }
  getSignaturePadNode() {
    const node = this.rootNode.findNode(this.config.nodeName5);
    if (node) {
      this.signaturePadNode = node;
      return node;
    }
    return false;
  }
  extractMoney(stringPrice) {
    const priceObject = {
      decimalValue: stringPrice.slice((stringPrice.length) - 2),
      priceValue: stringPrice.slice(1, (stringPrice.length) - 3),
      currency: stringPrice.charAt(0)
    };
    return priceObject;
  }
  setValue(type, value) {
    let node = this.rootNode.findNode(`${this.deviceSetObj}.${this.defaultSet[type]}`);
    value = typeof value === 'string' ? value : JSON.stringify(value);
    (node) ? node.setValue(value) : '';
  }
}
