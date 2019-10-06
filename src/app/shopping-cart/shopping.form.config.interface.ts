import { StepUxConfig } from '@lumen/client-angular';


export interface ShoppingFormConfigInterface extends StepUxConfig {
    subTitle: string;
    submitLabel: string;
    cancelLabel: string;
    selectedNode: string;
    tradeNode:string;
    cmsUrl: string;
    progressTitle: string;
    infoLabel: string;
    fields: Field[];
}

export interface Field {
    getVal: string;
    setVal: string;
}
