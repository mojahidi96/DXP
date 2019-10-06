import { Component } from '@angular/core';
import { TradeInConfirmConfigInterface } from './trade-in-confirm.config.interface';
import { StepComponentAbstract } from '@lumen/client-angular';

@Component(
    {
        templateUrl: './trade-in-confirm.component.html',
        styleUrls: ['./trade-in-confirm.component.scss'],
    }
)

export class TradeInConfirmComponent extends StepComponentAbstract{
    public config: TradeInConfirmConfigInterface;
    public EvaluationNode;
    public selectedDevice;
    public submitLabel;
    public data: any;
    constructor(){super();}
    ngOnInit(){
        this.data = this.rootNode.getValue();
        let submitnode = this.rootNode.findNode(this.config.submitLabel);
        if(submitnode){this.submitLabel = submitnode.value;}        
    }
    public submitForm(): void {
        if (!this.rootNode.validate()) {
            this.submit.emit();
        }
    }

}
