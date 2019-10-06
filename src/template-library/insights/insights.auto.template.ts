import { Component, OnInit } from '@angular/core';

import {InsightsService} from './Insights.service';
import { StepComponentAbstract } from '@lumen/client-angular';

@Component({
               template: ''
           })

export class InsightsAutoTemplate extends StepComponentAbstract implements OnInit {

    constructor(private insightService: InsightsService){
        super();
    }

    ngOnInit() {
        let userDetails = this.rootNode.findNode("CommonFields.Authentication.UserDetails");
        if(userDetails){
            this.insightService.startInsights(userDetails);
        }
        this.submit.emit();
    }


}
