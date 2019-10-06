import { Component, Input } from '@angular/core';

import {StepComponentAbstract} from "@lumen/client-angular";


@Component({
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.scss'],
})
export class BreadCrumbComponent extends StepComponentAbstract{
  public config;
  public data;

  constructor(){
    super();
  }

  ngOnInit(){
    this.config.fields.map(prop =>{
      if(this.rootNode){
        let propvalue = this.rootNode.findNode(prop.propertyValue);
        (propvalue)? prop.propertyValue = propvalue.value: prop.propertyValue = prop.propertyValue;
      }
    });
  }

}
