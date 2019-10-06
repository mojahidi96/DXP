/**
 * Created by adil0001 on 11/6/2018.
 */
import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {NodeComponentAbstract} from '@lumen/client-angular';

@Component({
    templateUrl: './date-time-node.component.html',
    styleUrls: ['./date-time-node.component.scss'],
})
export class DateTimeNodeComponent extends NodeComponentAbstract{
    public type = 'text';
    public min : Date;

    constructor(public datepipe: DatePipe){
        super();
    }

    ngOnInit() {
        this.min = new Date();
        console.log("time", this.min);
    }

    setDate(event:any) {
        this.node.setValue(this.datepipe.transform(event.value,'MM/dd/yyyy, hh:mm'));
    }
}
