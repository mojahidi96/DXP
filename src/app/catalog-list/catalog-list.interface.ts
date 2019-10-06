import { StepUxConfig } from "@lumen/client-angular";

export interface CATALOGLISTINTERFACE extends StepUxConfig {
    title: string;
    submitLabel: string;
    cancelLabel: string;
    cmsUrl: string;
    selectedNode: string;
    fields: FIELD[];
    setFields: SETFIELDS[];  
}

export interface FIELD {
    getObject: string;
    GetProperties: GETPROPERTY[]
}

export interface GETPROPERTY {
    getProperty: string;
}

export interface SETFIELDS {
    getVal: string;
    setVal: string;
}