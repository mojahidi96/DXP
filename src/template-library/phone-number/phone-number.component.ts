/**
 * Created by adil0001 on 11/14/2018.
 */
import {Component, OnInit} from '@angular/core';


import {NodeComponentAbstract} from '@lumen/client-angular';
import {PhoneNumberFormatPipe} from '../pipes/phone-number.pipe';

@Component({
    templateUrl: './phone-number.component.html',
    styleUrls: ['phone-number.scss'],
})

export class PhoneNumberNodeComponent extends NodeComponentAbstract implements OnInit{
phone:any;
    constructor(public phonePipe: PhoneNumberFormatPipe){
        super();
    }


    public ngOnInit(){
        console.log("phone", this.node)
    }


    public setPhoneNumber(event:any) {
        //let phone = this.node.value;
        this.phone = this.phonePipe.transform(event.target.value,'');
        if(this.node){
            this.node.setValue(event.target.value);
        }

    }
}
