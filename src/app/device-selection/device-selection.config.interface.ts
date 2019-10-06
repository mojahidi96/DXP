import { StepUxConfig } from "@lumen/client-angular";

export interface DeviceListConfigInterface extends StepUxConfig {
    subTitle: string;
    deviceType: string;
    manufacturer: string;
    model: string;
    color: string;
    storage: string;
    carrier: string;
    deviceCondition: string;
    deviceConditionQuestion1: string;
    deviceConditionQuestion2: string;
    photoFront: string;
    photoBack: string;
    tradeInValue: string;
    submitLabel: string;
    cancelLabel: string;
    progressTitle: string;
    selectedNode: string;
    nodeName: string;
    dataNodeName: string;
    cmsUrl: string;
    infoDescription: string;
    nodeName1: string;
    nodeName2: string;
    nodeName3: string;
    nodeName4: string;
    nodeName5: string;
    validationMessage: string;
    fields: Field[];
    listType: string;
}

export interface Field {
    getVal: string;
    setVal: string;
}
