import {StepUxConfig} from '@lumen/client-angular';


export interface Field {
  type: string;
  fieldPath: string;
  exprType: string;
  expression: string;
}

export interface AutoStepConfig extends StepUxConfig {
  fields: Field[];
}
