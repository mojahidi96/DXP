/**
 * Created by adil0001 on 11/14/2018.
 */
import {Component, OnInit} from '@angular/core';

import {NodeComponentAbstract} from '@lumen/client-angular';
import {SsnNumberFormatPipe} from '../pipes/ssn-number.pipe';

@Component({
    templateUrl: './ssn-node.component.html',
    styleUrls: ['ssn-node.scss'],
})

export class SsnNodeComponent extends NodeComponentAbstract implements OnInit{
    ssn:any;
    constructor(public ssnPipe: SsnNumberFormatPipe){
        super();
    }

    public ngOnInit(){
        console.log("phone", this.node)
    }

    public setSsnNumber(event:any) {
        this.ssn = this.ssnPipe.transform(event.target.value,'');
        if(this.node){
            this.node.setValue(event.target.value);
        }

    }
}
