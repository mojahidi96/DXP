import {Injectable} from '@angular/core';

@Injectable()
export class ProductService{

    productList:Array<any> = [];

    public setProductList(list:any[]):void{
        this.productList = list;
    }

    public getProductList():any[]{
        return this.productList;
    }
}
