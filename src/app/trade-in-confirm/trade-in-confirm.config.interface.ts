import { StepUxConfig } from '@lumen/client-angular';

export interface TradeInConfirmConfigInterface extends StepUxConfig {
    subTitle: string;
    submitLabel: string;
    cancelLabel: string;
    cmsUrl: string;
    progressTitle: string;
    infoLabel: string;
}

export interface Field {
    getVal: string;
    setVal: string;
}
