import {Component, Input, OnInit} from '@angular/core';
import {StepComponentAbstract} from "@lumen/client-angular";


@Component(
  {
    selector: 'promo-comp',
    templateUrl: './promo.html',
    styleUrls: ['./promo.scss']
  }
)

export class PromoComponent extends StepComponentAbstract implements OnInit {

  @Input() node: any;

  public isEnabled: boolean = false;
  public promoImg: string;
  public promoText: string;

  ngOnInit(): void {
    if (this.rootNode.findNode('CommonFields.Promotion.isEnable')) {
      this.isEnabled = this.rootNode.findNode('CommonFields.Promotion.isEnable').getValue();
    }
    if (this.rootNode.findNode('CommonFields.Promotion.promoImage')) {
      this.promoImg = this.rootNode.findNode('CommonFields.Promotion.promoImage').getValue();
    }
    if (this.rootNode.findNode('CommonFields.Promotion.promoText')) {
      this.promoText = this.rootNode.findNode('CommonFields.Promotion.promoText').getValue();
    }
  }

}
