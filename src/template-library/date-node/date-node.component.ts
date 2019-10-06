import {Component} from '@angular/core';

import {DatePipe} from "@angular/common";
import {NodeComponentAbstract} from '@lumen/client-angular';

@Component({
    styleUrls: ['./date-node.component.scss'],
    templateUrl: './date-node.component.html',
})

export class DateNodeComponent extends NodeComponentAbstract{

    public min : Date;

    constructor(public datepipe: DatePipe){
        super();
    }

    ngOnInit() {
        this.min = new Date();
        console.log("date", this.min);
    }

    setDate(event:any) {
        this.node.setValue(this.datepipe.transform(event.value,'MM/dd/yyyy'));
    }
}
