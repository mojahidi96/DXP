import {StepUxConfig} from "@lumen/client-angular";

export interface Field {
    label: string;
  selectedField:string;
    value:string;
    exprType: string;
    expression: string;
    defaultImage:string;
    selectedImage:string;
    dataNodeName:string;
}

export interface ServiceTypeConfigInterface extends StepUxConfig {
    subTitle: string;
    submitLabel: string;
    message:string;
    cancelLabel:string;
    confirmLabel:string;
    progressTitle:string;
    fields: Field[];
}
