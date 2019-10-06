import {Component, OnInit, ViewChild} from '@angular/core';
import {StepComponentAbstract} from "@lumen/client-angular";
import {ProductListConfigInterface} from "./product.list.config.interface";
import {from} from "rxjs/index";
import {groupBy, mergeMap, toArray} from "rxjs/internal/operators";
import {ProductDetailsComponent} from "../product-details/product.details.component";

@Component(
  {
    templateUrl: './product-list.html',
    styleUrls: ['./product-list.scss']
  }
)
export class ProductListComponent extends StepComponentAbstract implements OnInit {
  @ViewChild(ProductDetailsComponent) public productDetails:ProductDetailsComponent;
  public config: ProductListConfigInterface;
  public data: any;
  productList: any;
  selectedPartner: string;
  selectedCategory: string;
  selectedSort: boolean;

  active: boolean = false;
  details: any;

  modalOpened: boolean = false;
  filters: any;
  choosenFilter: Array<any> = [];

  ngOnInit(): void {
    let productNode = this.rootNode.findNode('ProductCatalogResponse.Products');
    let filterNode = this.rootNode.findNode('ProductCatalogResponse.Filters');

    if (!productNode) {
      throw new Error('no node');
    }
    this.productList = productNode.getValue();
    this.filters = filterNode.getValue();
  }


  protected getImage(product: any): string {
    if (product && product.imageList && product.imageList.length > 0 && this.config.cmsUrl) {
      return this.config.cmsUrl + product.imageList[0].medium;
    } else if (product && product.imageList && product.imageList.length > 0) {
      return product.imageList[0].medium;
    }
    return null;
  }

  protected displayProductDetails(product: any) {
    this.modalOpened = false;
    if (product) {
      this.details = {...product};
    }
  }

  public filterProducts(event: any) {
    let list = this.data.ProductCatalogResponse.Products;
    if (this.productList) {
      if (this.selectedPartner)
        list = list.filter(item => (item.partnerid === this.selectedPartner));
      if (this.selectedCategory)
        list = list.filter(item => (item.categoryid === this.selectedCategory));
      this.productList = list;
    }
  }

  public sortProducts() {
    this.productList.sort((a: any, b: any) => {
      if (this.selectedSort) {
        return (parseInt(a['price']) > parseInt(b['price'])) ? 1 : ((parseInt(a['price']) < parseInt(b['price'])) ? -1 : 0);
      } else {
        return (parseInt(b['price']) > parseInt(a['price'])) ? 1 : ((parseInt(b['price']) < parseInt(a['price'])) ? -1 : 0);
      }
    });
  }

  public clear() {
    this.filters.forEach(item => {
      item.FilterList.forEach(x => {
        x.checked = false;
      })
    });
    this.choosenFilter = [];
    this.modalOpened = false;
    this.productList = this.rootNode.findNode('ProductCatalogResponse.Products').getValue();
  }

  public onChangeEvent(event: any, data: any) {
    if (event.checked) {
      this.choosenFilter.push(data);
      data.checked = true;
    } else {
      if (this.choosenFilter && this.choosenFilter.length > 0) {
        //this.choosenFilter.map(item => item.filter(x => ) item.filterId == data.filterId);
        this.choosenFilter = this.choosenFilter.filter(item => {
          if (item.filterID == data.filterID && item.filterType == data.filterType) {
            item.checked = false;
            return false;
          } else
            return true;
        });
      }
    }
  }

  public onFilterClick() {
    this.modalOpened = !this.modalOpened;
    //this.productDetails.closeDetails();
  }

  public filterProductList() {

    let node = this.rootNode.findNode('ProductCatalogResponse.Products');
    if (!node) {
      throw new Error('no node');
    }
    let list = node.getValue();

    let filterData: Array<any> = [];
    let source = from(this.choosenFilter);
    let obs = source.pipe(
      groupBy(obj => obj.filterType),
      mergeMap(group => group.pipe(toArray())),
      toArray()
    );

    obs.subscribe(multiList => {
      console.log(multiList);
      if (list) {
        multiList.forEach(multiItem => {
          if (filterData && filterData.length == 0)
            filterData = this.runOrFilter(multiItem, list);
          else
            filterData = this.runOrFilter(multiItem, filterData);
        });
        this.productList = filterData;
        this.modalOpened = false;
      }
    });
  }

  private runOrFilter(multiItem: any, list: any) {
    let data: Array<any> = [];
    multiItem.forEach(item => {
      let dataList = list.filter(listItem => {
        if (listItem[item.filterType])
          return (listItem[item.filterType].indexOf(item.filterID) > -1);
        else
          return false;
      });
      data = [...data, ...dataList];
    });
    return data;
  }
}
