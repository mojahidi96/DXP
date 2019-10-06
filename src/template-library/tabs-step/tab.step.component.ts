import {Component, OnInit} from '@angular/core';

import {TabStepConfigInterface} from './tab-step-config-interface';
import {StepComponentAbstract} from '@lumen/client-angular';

@Component(
    {
        templateUrl: './tab-step.html',
    }
)

export class TabStepComponent extends StepComponentAbstract implements OnInit{


    public config : TabStepConfigInterface


    ngOnInit(): void {
        console.log(this.config);
    }

}
