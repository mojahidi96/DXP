import { Component } from '@angular/core';

import { StepComponentAbstract } from '@lumen/client-angular';

import { SimpleFormStepConfig } from './simple-form-step-config.interface';

@Component({
  templateUrl: './simple-form-step.component.html',
})
export class SimpleFormStepComponent extends StepComponentAbstract {
  public config: SimpleFormStepConfig;
  public sending = false;

  public submitForm(): void {
    if (!this.rootNode.validate()) {
      this.sending = true;
      this.submit.emit();
    }
  }
}
