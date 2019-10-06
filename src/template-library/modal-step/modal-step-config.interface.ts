import {StepUxConfig} from '@lumen/client-angular';


export interface Field {
    label: string;
    nodeName:string;
    value:string;
    exprType: string;
    expression: string;
}

export interface ModalStepConfigInterface extends StepUxConfig {
    onLoad:boolean;
    message:string;
    modalType:string;
    cancelLabel:string;
    confirmLabel:string;
    fields: Field[];
}
