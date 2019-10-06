import {Component, OnInit} from '@angular/core';
import {StepComponentAbstract} from "@lumen/client-angular";


@Component(
    {
        templateUrl: './billing-details.html',
        styleUrls: ['./bill-details.scss']
    }
)

export class BillingDetailsComponent extends StepComponentAbstract implements OnInit{
    tax:number = 0;
    data:any;
    

    ngOnInit(): void {
        this.data = this.rootNode.getValue();
       let node1= this.rootNode.findNode('CommonFields.OrderInformation').getValue();
       let node2 =this.rootNode.findNode('CommonFields.OrderInformation.totalTax').getValue();
       
        if(node1 && node2)
        {
            this.tax = node2;
        }
    }


}
