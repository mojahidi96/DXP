import {StepUxConfig} from "@lumen/client-angular";

export interface ProductListConfigInterface extends StepUxConfig{
    subTitle:string;
    submitLabel: string;
    cancelLabel: string;
    progressTitle:string;
    selectedNode:string;
    cmsUrl:string;
    fields: Field[];
}

export interface Field {
    getVal:string;
    setVal:string;
}
