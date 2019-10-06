import {StepUxConfig} from '@lumen/client-angular';


export interface Field {
    tab: string;
    componentName:string;
}

export interface TabStepConfigInterface extends StepUxConfig {
    fields: Field[];
}
