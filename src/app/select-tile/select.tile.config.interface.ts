import {StepUxConfig} from "@lumen/client-angular";


export interface SelectTileConfigInterface extends StepUxConfig {
  displayType: string;
  subTitle?: string;
  submitLabel: string;
  cancelLabel: string;
  title: string;
  listHeader: string;
  responseQuery: string;
  childNodeName: string;
  selectedNode: string;
  tileSelect: string;
  progressTitle: string;
  currency: string;
  cmsUrl: string;
  fields?: Field[];
}

export interface Field {
  getVal: string;
  setVal: string;
}
