/**
 * Created by adil0001 on 10/29/2018.
 */
import {StepUxConfig} from '@lumen/client-angular';


export interface Field {
    getNode:string;
    setNode:string;
}

export interface Component {
    componentName:string;
}

export interface Section{
    title:string;
    subTitle:string;
  internalNodeName:string;
    hidden:boolean;
    action:string;
    actionProperties:ActionProp;
}

export interface ActionProp{
    selectNodeName:string;
    checkValue:string;
    sectionPosition:string;
    fields: Field[];
}

export interface SectionFormConfigInterface extends StepUxConfig {
    title: string;
    subTitle: string;
    submitLabel: string;
    cancelLabel: string;
    progressTitle:string;
    sections:Section[];
    Components:Component[];
}
