import { Component, OnInit } from '@angular/core';

import {StepComponentAbstract} from "@lumen/client-angular";
import { SectionalTemplateInterface } from './sectional-template.interface';


@Component({
  templateUrl: './sectional-template.component.html'
})
export class SectionalTemplateComponent extends StepComponentAbstract implements OnInit{
  public config: SectionalTemplateInterface;
  public components:any;
  public data:any

  ngOnInit(){
    this.components = this.config.Components.sort((a,b)=>a.position-b.position);
    this.data = this.rootNode.getValue();
  }

  onSubmit(){
    this.submit.emit();
  }
}
