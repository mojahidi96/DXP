import {StepUxConfig} from "@lumen/client-angular";

export interface SectionalTemplateInterface extends StepUxConfig {
  title: string;
    submitLabel: string;
    cancelLabel: string;
    cmsUrl: string;
    Components: COMPONENTS[];

}

export interface COMPONENTS {
  componentName: string;
  componentTitle: string;
  componentSubTitle: string;
  componentSelectionNode: string;
  componentResponseNode : string;
  position:number;
  fields:FIELD[]
}

export interface FIELD{
  propertyName:string;
  propertyValue:string;
}
