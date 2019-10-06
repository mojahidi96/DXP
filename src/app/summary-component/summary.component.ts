import {Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import {GroupNodesService, StepComponentAbstract} from "@lumen/client-angular";
import {SummaryConfigInterface} from "./summary-config.interface";
import {ObjectNode} from "@lumen/core-js";
import { TemplateService } from 'src/template-library/services/com.service';



@Component(
    {
        selector : 'summary',
        templateUrl : './summary-display.html',
        styleUrls: ['./summary.scss'],
    }
)
export class SummaryComponent extends StepComponentAbstract implements OnInit, AfterViewInit {
    public config:SummaryConfigInterface;
    public leftNode:any;
    public rightNode:any;
    public cardDetailsNode: any;
    public oneTimeTotal:number;
    public monthlyTotal:number;
    public selectedItems:any;
    public installText:string;
    public dateValue : any;
    public isFlowBroadband : boolean;
    public tax:number = 0;
    public transId: any;
    public customerEmail: string;
    public tradeInDeviceDetails: any={};
    public tradeInValue: any;
    public dataType : any;
    public transactionDetailNode: any;
    public data:any;
    constructor(private groupNodesService: GroupNodesService, public tempService:TemplateService) {
        super();
    }

    ngOnInit() {
        this.oneTimeTotal = 0;
        this.monthlyTotal = 0;
        this.data = this.rootNode.getValue();
        this.selectedItems = this.data.CommonFields.SelectedItems;

        if(this.selectedItems){
            this.selectedItems = this.selectedItems.reverse();
        }

        if(this.data.CommonFields.Authentication.flowType){
            this.dataType = this.data.CommonFields.Authentication.flowType;
        }

        this.setInstallType();
        this.dispCustomerInfo();
        this.dispServiceAddress();
        this.dispDateOpt();
        this.calcOneTimeMonthlyCharges();
        this.dispPaymentMethod();
        this.dispAckId();
        //this.disTradeInDevice();
        this.dispTransactionDetail()
        if(this.config.isContentRequired.toLowerCase() === 'yes'){
            let resp = {type:'cart', data:0};
            this.tempService.setInfo(resp);
        }
        if (this.dataType === 'wireless') {
            this.disTradeInDevice();
        }
        this.dispTransactionDetail();
    }

    // @HostListener('document:visibilitychange')
    // onUnload() {
    // // Since isContentRequired is only true on Order confirmation
    //  if(this.config.isContentRequired.toLowerCase() === 'yes'){
    //     const abandoned = this.rootNode.findNode('CommonFields.abandoned');

    //     if (abandoned) {
    //         abandoned.setValue(true);
    //     }
    //     this.placeOrder();
    //     }
    // }

    private setInstallType() {
      let nodeInstall = this.rootNode.findNode('CommonFields.InstallTypes').getValue();
      let nodeInstallType = this.rootNode.findNode('CommonFields.InstallTypes.installType').getValue();
        if(nodeInstall && nodeInstallType){
            this.installText = nodeInstallType;
        }
    }

    private dispCustomerInfo() {
      let node = this.rootNode.findNode('CommonFields.CustomerInfo');
      this.customerEmail =  this.rootNode.findNode('CommonFields.CustomerInfo.emailAddress').getValue();
      if(node instanceof ObjectNode){
        this.leftNode = this.groupNodesService.groupNodes(node, [])[0];
      }
    }

    private dispServiceAddress() {
        let nodeAdd = this.rootNode.findNode('CommonFields.ServiceAddress');
        if(nodeAdd instanceof ObjectNode){
            this.rightNode = this.groupNodesService.groupNodes(nodeAdd, [])[0];
        }
    }

    private dispDateOpt() {
        let dateNode = this.rootNode.findNode('CommonFields.DateOptions');
        if(dateNode instanceof ObjectNode){
            this.dateValue = this.groupNodesService.groupNodes(dateNode, [])[0];
        }
    }

    private dispPaymentMethod() {
        let cardNode = this.rootNode.findNode('CreditCardInfo.CardDetails');
        if (cardNode instanceof ObjectNode) {
            this.cardDetailsNode = this.groupNodesService.groupNodes(cardNode, [])[0];
        }
    }
    private dispTransactionDetail() {
        let transactionNode = this.rootNode.findNode('CreditCardInfo.TransactionDetail');
        if (transactionNode instanceof ObjectNode) {
            this.transactionDetailNode = this.groupNodesService.groupNodes(transactionNode, [])[0];
        }
    }

    private dispAckId() {
      let responseNode = this.rootNode.findNode('ResponseMessage').getValue();
      let ackIdNode = this.rootNode.findNode('ResponseMessage.ackId').getValue();
        if (responseNode && ackIdNode) {
            this.transId = ackIdNode;
        }
    }

    private disTradeInDevice() {
        let tradeInDataNode = this.rootNode.findNode('CommonFields.TradeIn.SelectedDeviceSummary');
        if (tradeInDataNode) {
            this.tradeInDeviceDetails = tradeInDataNode.getValue();
            if (this.tradeInDeviceDetails && this.tradeInDeviceDetails.selectedDevice) {
                this.tradeInDeviceDetails.selectedDevice = JSON.parse(this.tradeInDeviceDetails.selectedDevice);
            }
        }
    }

    private calcOneTimeMonthlyCharges() {
      let data = this.rootNode.getValue();
      let selectedNode = this.rootNode.findNode('CommonFields.SelectedItems');


        if(data && selectedNode.getValue()){
            for(let item of selectedNode.getValue()){
                if(item){
                    let monthlyPrice:number = 0;
                    let oneTimePrice:number = 0;
                    if(item.itemMonthlyPrice && item.itemMonthlyPrice != null && item.itemMonthlyPrice != "" && item.itemMonthlyPrice != undefined){
                        monthlyPrice= parseFloat(item.itemMonthlyPrice);
                    }
                    if(item.itemOneTimePrice && item.itemOneTimePrice != null && item.itemOneTimePrice != "" && item.itemOneTimePrice != undefined){
                        oneTimePrice = parseFloat(item.itemOneTimePrice);
                    }

                    if(monthlyPrice > 0){
                        this.monthlyTotal = this.monthlyTotal + monthlyPrice;
                    }

                    if(oneTimePrice > 0){
                        this.oneTimeTotal = this.oneTimeTotal + oneTimePrice;
                    }
                }
            }
            this.monthlyTotal = parseFloat(this.monthlyTotal.toFixed(2));
            this.oneTimeTotal = parseFloat(this.oneTimeTotal.toFixed(2));
        }

        let node2 = this.rootNode.findNode("CommonFields.OrderInformation.totalMonthlyCharges");
        if(node2)
            node2.setValue(this.monthlyTotal);

        let node3 = this.rootNode.findNode('CommonFields.OrderInformation.totalOneTimeCharge');
        if(node3)
            node3.setValue(this.oneTimeTotal);

        let node4 = this.rootNode.findNode('CommonFields.OrderInformation.total');
        let total=this.monthlyTotal + this.oneTimeTotal;
        if(node4){
            node4.setValue(total);
        }

        let orderNode = this.rootNode.findNode('CommonFields.OrderInformation').getValue();
        let taxNode = this.rootNode.findNode('CommonFields.OrderInformation.totalTax').getValue();
        if(data && orderNode && taxNode){
            this.tax = taxNode;
        }
        let node5 = this.rootNode.findNode('CommonFields.OrderInformation.grandTotal');
        let grandTotal = (total+this.tax);
        if(node5){
            node5.setValue(grandTotal);
        }
    }

    protected getItemPrice(item, isTradeIn){
        if(isTradeIn && this.tradeInDeviceDetails.selectedDevice.devicePriceList){
           this.tradeInValue = this.tradeInDeviceDetails.selectedDeviceTradeInValue?this.tradeInDeviceDetails.selectedDeviceTradeInValue:this.tradeInDeviceDetails.selectedDevice.devicePriceList[0].local_customer_display_price;
           return this.tradeInValue;
        }
        else{
            if(item){
                let quantity = (item.itemQuantity) ? item.itemQuantity : 1;
                return (parseFloat(item.itemPrice) * quantity);
            }
        return 0;
        }
    }

    protected getRatePlanPrice(item){
        if(item){
            let quantity = (item.itemQuantity) ? item.itemQuantity : 1;
            return (parseFloat(item.ratePlan.planMonthlyPrice) * quantity);
        }
        return 0;
    }

    protected getTotal():number{
        let total:number = 0;
        let monthlyPrice:number = 0;
        let oneTimePrice:number = 0;

        if(this.selectedItems){
            for(let item of this.selectedItems){
                if(item){
                    let quantity = item.itemQuantity ? item.itemQuantity : 1;
                    oneTimePrice += (parseFloat(item.itemPrice) * quantity);

                    if(item.ratePlan){
                        monthlyPrice += (parseFloat(item.ratePlan.planMonthlyPrice) * quantity);
                    }
                }
            }
            this.monthlyTotal = monthlyPrice;
            this.oneTimeTotal = oneTimePrice;
            total = oneTimePrice + monthlyPrice;
        }

        let node1 = this.rootNode.findNode("CommonFields.OrderInformation.totalMonthlyCharges");
        if(node1)
            node1.setValue(monthlyPrice);

        let node2 = this.rootNode.findNode('CommonFields.OrderInformation.totalOneTimeCharge');
        if(node2)
            node2.setValue(oneTimePrice);

        let node3 = this.rootNode.findNode('CommonFields.OrderInformation.total');
        if(node3){
            node3.setValue(total);
        }

        let data = this.rootNode.getValue();
      let orderNode = this.rootNode.findNode('CommonFields.OrderInformation').getValue();
      let taxNode = this.rootNode.findNode('CommonFields.OrderInformation.totalTax').getValue();

      if(data && orderNode && taxNode){
        this.tax = taxNode;
      }

        let node5 = this.rootNode.findNode('CommonFields.OrderInformation.TradeInValue');
        let tradeInPrice = this.tradeInValue?parseFloat(this.tradeInValue.split('$')[1]):0;
        if(node5){
            node5.setValue(tradeInPrice);
        }

        let node4 = this.rootNode.findNode('CommonFields.OrderInformation.grandTotal');
        let grandTotal=(total+this.tax)-tradeInPrice;
        if(node4){
            node4.setValue(grandTotal);
        }

        return grandTotal;
    }
    public getImage(): any {
        let imageNode = this.rootNode.findNode('CommonFields.titleImage');
        if (imageNode && this.config.cmsUrl) {
            return this.config.cmsUrl + imageNode.getValue();
        }
        else {
            return false;
        }
    }

    public placeOrder():void{
        let node = this.rootNode.findNode('CommonFields.SelectedItems');
        if(node){
            node.setValue([]);
        }
        this.submit.emit();
    }

    ngAfterViewInit() {
        document.getElementById('main-section').scrollTop = 0;
    }
}
