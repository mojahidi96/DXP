import { StepUxConfig } from '@lumen/client-angular';

export interface DeviceDataInputConfigInterface extends StepUxConfig {
    subTitle: string;
    tagLine:string;
    submitLabel:string;
    cancelLabel:string;
    progressTitle:string;
    currency:string;
    dataNodeName:string;
    setNode:string;
    itemLabel:string;
    itemId:string;
    itemModel:string;
    itemPlaceHolder:string;
    itemColor:string;
    itemVariant:string;
    channel:string;
    Components:Component[];
}

export interface Component {
    componentName:string;
}
