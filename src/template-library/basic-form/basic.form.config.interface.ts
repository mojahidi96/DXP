import {StepUxConfig} from '@lumen/client-angular';


export interface Component {
    componentName:string;
}

export interface BasicFormConfigInterface extends StepUxConfig {
    subTitle: string;
    submitLabel: string;
    anchorText:string
    progressTitle:string;
    cancelLabel:string;
    Components:Component[];
}
