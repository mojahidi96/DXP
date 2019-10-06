import {Component, OnInit} from '@angular/core';

import {ShoppingFormConfigInterface} from "./shopping.form.config.interface";
import {ProductService} from "../product-details/product.service";

import {StepComponentAbstract} from '@lumen/client-angular';
import {TemplateService} from 'src/template-library/services/com.service';

@Component(
  {
    templateUrl: 'shopping-cart.html',
    styleUrls: ['shopping-cart.scss']
  }
)

export class ShoppingCartComponent extends StepComponentAbstract implements OnInit {

  public config: ShoppingFormConfigInterface;
  public items: Array<any> = [];
  options: Array<any> = [1, 2, 3, 4, 5];
  public cancelLabel;

  constructor(
    protected productService: ProductService,
    private templateService: TemplateService
  ) {
    super();
  }

  ngOnInit(): void {
    let list = this.productService.getProductList();
    if (list) {
      console.log(list);
      this.items = list;
    }
    let cancelnode = this.rootNode.findNode(this.config.cancelLabel);
    if (cancelnode) {
      this.cancelLabel = cancelnode.value;
    }
  }

  protected getItemPrice(item) {
    let quantity = item.itemQuantity ? item.itemQuantity : 1;
    return (parseFloat(item.itemPrice) * quantity);
  }

  protected getPlanPrice(item) {
    let quantity = item.itemQuantity ? item.itemQuantity : 1;
    let planPrice = 0;
    if (item.ratePlan)
      planPrice = (parseFloat(item.ratePlan.planMonthlyPrice) * quantity);
    return planPrice;
  }

  protected removeProduct(product) {
    this.items.forEach((item, index) => {
      if (item === product) this.items.splice(index, 1);
    });

    if (this.items && this.items.length === 0) {
      let resp = {type: 'cart', data: 0};
      this.templateService.setInfo(resp);
    } else if (this.items && this.items.length > 0) {
      let resp = {type: 'cart', data: this.items.length};
      this.templateService.setInfo(resp);
    }
  }

  protected getTotal(): number {
    let total: number = 0;
    for (let item of this.items) {
      if (item) {
        let quantity = item.itemQuantity ? item.itemQuantity : 1;
        total += (parseFloat(item.itemPrice) * quantity);

        if (item.ratePlan) {
          total += (parseFloat(item.ratePlan.planMonthlyPrice) * quantity);
        }
      }
    }
    return total;
  }

  public submitCart(isTrade): void {
    let tradeNode = this.rootNode.findNode(this.config.tradeNode);
    if (tradeNode) {
      tradeNode.setValue(isTrade);
    }
    this.formSubmit();
  }

  public formSubmit(): void {
    let node = this.rootNode.findNode(this.config.selectedNode);
    if (node) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].itemQtyPrice = this.items[i].itemPrice * this.items[i].itemQuantity;
        this.items[i].itemQtyPrice = this.items[i].itemQtyPrice.toString();
      }
      node.setValue(this.items);
      this.submit.emit();
    }
  }
}
