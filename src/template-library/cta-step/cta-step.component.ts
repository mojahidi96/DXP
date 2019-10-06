import {Component, OnInit} from '@angular/core';

import { StepComponentAbstract } from '@lumen/client-angular';

import { Cta, CtaStepConfig } from './cta-step-config.interface';

@Component({
  templateUrl: './cta-step.component.html',
})
export class CtaStepComponent extends StepComponentAbstract implements OnInit{
  public config: CtaStepConfig;
  public data: any;


  ngOnInit() {
    this.data = this.rootNode.getValue();
  }
  public click(cta: Cta): void {
    const node = this.rootNode.findNode(cta.internalnodeName);

    if (node) {
      node.setValue(cta.value, false);

    }
    this.submit.emit();
  }
}
