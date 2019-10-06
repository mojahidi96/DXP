import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ProductService} from "./product.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import * as jsonPath from 'jsonpath/jsonpath';
import {TemplateService} from "../../template-library/services/com.service";
import {ModalService} from "../../template-library/modal-step/modal.service";
import {RateplanModalComponent } from '../rate-plan-modal/rateplan-modal.component';

@Component(
    {
        selector: 'product-details',
        templateUrl: './product-details.html',
        styleUrls: ['./product-details.scss']
    }
)
export class ProductDetailsComponent implements OnChanges{

    @Input() rootNode:any;
    @Input() config:any;
    @Input() data:any;
    @Input() active:boolean = false;
    @Input() details:any;

    basketArr:Array<any>=[];
    choiceVariant:any={};
    choiceColor:any={};
    selection:any={};

    imageDisp:string;
    variantChoice:string;

    imgPosition:number=0;
    variantPosition:number=0;

    price:string;

    options:Array<any> = [1, 2, 3, 4, 5];
    ratePlan:any = null;
    carrierList:Array<any>=[];

    constructor(
        protected productService : ProductService,
        public snackBar1: MatSnackBar,
        public tempService:TemplateService,
        public modalService : ModalService
    ){}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['details'] && changes['details'].currentValue != null){
            this.details = changes['details'].currentValue;
            this.details.quantity = 1;

            this.ratePlan = null;

            if(!this.active){
                this.active = true;
            }

            this.choiceColor = {};
            this.imgPosition = 0;
            this.selectColor();
            this.choiceVariant = {};
            this.variantPosition=0;
            this.selectVariant();

            this.price = this.details.price;

            this.carrierList = this.getCarrierList();
        }
    }

    private getCarrierList():Array<any>{
        let carrier:Array<any> = [];
        this.data = this.rootNode.getValue();
        let resNode = this.rootNode.findNode('ProductCatalogResponse');
        let productRes = resNode.getValue();
        let filterNode = this.rootNode.findNode('ProductCatalogResponse.Filters');

        if(this.data && productRes){
            let filters = filterNode.getValue();
            if(filters && this.details && this.details.partnerid){
                carrier = jsonPath.query(filters, "$..FilterList[?(@.filterID =="+ this.details.partnerid+" && @.filterType == 'partnerid')]");
            }
        }
        if(carrier.length > 0)
            this.details.carrier = carrier[0];

        return carrier;
    }

    public closeDetails(){
        if(this.active){
            this.active = false;
        }
    }

    private getFirstChoice(type:string):any{
        if(this.details && this.details.customizations){
            for(let custom of this.details.customizations){
                if(custom.title === type){
                    for(let choice of custom.choices){
                        return choice;
                    }
                }
            }
        }
        return "";
    }

    protected selectColor(choice?:any, position?:number){
        if(choice){
            this.choiceColor = choice;
            this.imgPosition = position;
            this.imageDisp = this.config.cmsUrl + choice.choiceImage;
            this.selection = choice.selection;
        } else {
            let firstChoice = this.getFirstChoice('Color');
            this.imageDisp = this.config.cmsUrl + firstChoice.choiceImage;
            this.choiceColor = firstChoice;
            this.selection = firstChoice.selection;
        }
    }

    protected selectVariant(choice?:any, position?:number){
        if(choice){
            this.choiceVariant = choice;
            this.variantPosition = position;
            this.variantChoice = choice.selection;
            if(choice.choicePrice){
                this.price = choice.choicePrice;
            }
        } else {
            let firstChoice= this.getFirstChoice('Variant');
            if(firstChoice){
                this.variantChoice = firstChoice.selection;
                this.choiceVariant = firstChoice;
            }
        }
    }

    protected addToBasket(product:any){
        if(product){
            if(this.choiceColor && this.choiceColor.choiceColor){
                product.color = this.choiceColor.choiceColor;
                product.image = this.choiceColor.choiceImage;
                product.selection = this.choiceColor.selection;
            }
            if(this.choiceVariant && this.choiceVariant.selection){
                product.price = this.choiceVariant.choicePrice;
                product.variant = this.choiceVariant.selection;
            }
            if(this.ratePlan){
                let plan = this.ratePlan.data;
                product.ratePlan ={
                    planPackageName: plan.packageName,
                    planOnetimePrice: plan.onetimePrice,
                    planMonthlyPrice: plan.monthlyPrice,
                    featuresList: plan.features
                };
            }
            if(product.carrier && product.carrier.filterTitle){
                product.carrierName = product.carrier.filterTitle;
            }

            this.createBasket(product);
            let config = new MatSnackBarConfig();
            config.duration = 2000;
            config.horizontalPosition = 'right';
            config.verticalPosition = 'top';
            config.panelClass = ['snack-bar-container'];
            this.snackBar1.open("Added to Cart", '', config);
            this.productService.setProductList(this.basketArr);

            let resp = {type:'cart', data:this.getTotalProducts()};
            this.tempService.setInfo(resp);

            if (this.active) {
            this.active = false;
          }

        }
    }

    private getTotalProducts(){
        let total = 0;
        this.productService.getProductList().forEach(product => {
           total += product.itemQuantity;
        });
        return total;
    }

    private createBasket(product: any) {
        let data = {};
        for(let field of this.config.fields){
            data[field.setVal] = product[field.getVal];
        }
        let selectedIndex;
        let selectedItems = this.basketArr.filter((item, i) => {
            selectedIndex = i;
            for (let field of this.config.fields) {
                if (field.setVal !== 'itemQuantity')
                    if (item[field.setVal] !== data[field.setVal]) {
                        return false;
                    }
            }
            return true;
        });
        (selectedItems.length <= 0) ? this.basketArr.push(data) :
            this.basketArr[selectedIndex].itemQuantity += 1;

    }

    public openRatePlan(){
        this.modalService.openCustomModal(
            {
                cancelLabel: 'No',
                confirmLabel: 'Yes',
                message: 'Do you wish to clear your saved data?',
                title: 'Restart Session',
                data: this.data,
                id:this.details.partnerid,
                width: '60vw'
            }, RateplanModalComponent).afterClosed().subscribe((result) => {
                if (result) {
                    this.ratePlan = result;
                } else {
                    this.ratePlan = null
                }
            }
            );
    }

    /*private removeDuplicates(list: any, key:string) {
        return list.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
        });
    }*/
}
