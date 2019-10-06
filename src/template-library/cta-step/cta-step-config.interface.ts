import { StepUxConfig } from '@lumen/client-angular';

export interface Cta {
  backgroundImage?: string;
  description?: string;
  label: string;
  internalnodeName: string;
  value: string;
}

export interface CtaStepConfig extends StepUxConfig {
  ctas: Cta[];
  subTitle?: string;
}
