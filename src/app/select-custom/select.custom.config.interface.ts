import {StepUxConfig} from "@lumen/client-angular";


export interface SelectCustomConfigInterface extends StepUxConfig {
  subTitle: string;
  submitLabel: string;
  cancelLabel: string;
  title: string;
  respJsonPath: string;
  selectedNode: string;
  cmsUrl: string;
  progressTitle: string;
  currency: string;
  fields: Field[];
}

export interface Field {
  setVal: string;
  getVal: string;
}

