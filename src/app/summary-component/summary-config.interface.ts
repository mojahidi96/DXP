import { StepUxConfig } from '@lumen/client-angular';

export interface SummaryConfigInterface extends StepUxConfig {
    title: string;
    subTitle: string;
    description: string;
    titleImage: string;
    submitLabel:string;
    cancelLabel:string;
    subTitle1:string;
    subTitle2:string;
    subTitle3:string;
    progressTitle:string;
    cmsUrl:string;
    isContentRequired:string;
    Components:Component[];
}

export interface Component {
    componentName:string;
}
