import { ProgressBarComponent } from './../app/progress-bar/progress.bar.component';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Camera} from '@ionic-native/camera/ngx';

import {
  LUMEN_NODE_COMPONENTS, LUMEN_PILOT_FACTORY, LUMEN_STEP_TEMPLATES, LumenModule, PilotFactoryConfig, PilotFactoryResolver,
  TranslatePipe
} from '@lumen/client-angular';


import {BooleanNodeComponent} from './boolean-node/boolean-node.component';
import {CtaStepComponent} from './cta-step/cta-step.component';
import {DateNodeComponent} from './date-node/date-node.component';
import {ImageCaptureNodeComponent} from './image-capture-node/image-capture-node.component';
import {ImageNodeComponent} from './image-node/image-node.component';
import {NodeLayoutComponent} from './node-layout/node-layout.component';
import {NoStepComponent} from './no-step/no-step.component';
import {SignatureNodeComponent} from './signature-node/signature-node.component';
import {SimpleFormStepComponent} from './simple-form-step/simple-form-step.component';
import {StringNodeComponent} from './string-node/string-node.component';
import {TextNodeComponent} from './text-node/text-node.component';
import {ModalStepComponent} from './modal-step/modal.step.component';
import {TabStepComponent} from './tabs-step/tab.step.component';
import {RadioNodeComponent} from './radio-node/radio-node.component';
import {DoneStepComponent} from './done-step/done.step.component';
import {UiConfigNodeDirective} from './directives/uiconfig.node.directive';
import {PasswordNodeComponent} from './password-node/password-node.component';
import {DateTimeNodeComponent} from './date-time-node/date-time-node.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime/date-time';
import {PhoneNumberNodeComponent} from './phone-number/phone-number.component';
import {SsnNodeComponent} from './ssn-node/ssn-node.component';
import {CheckboxNodeComponent} from './checkbox-node/checkbox-node-component';
import {AutoStepComponent} from './auto-step/auto-step.component';
import {ResumeNodeComponent} from './resume-node/resume-node.component';
import {BarcodeNodeComponent} from './barcode-node/barcode.node.component';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {LabelNodeComponent} from './label-node/label.node.component';
import {SectionFormComponent} from './section-form/section-form.component';
import {BasicFormComponent} from './basic-form/basic.form.component';
import {TextAreaNodeComponent} from './text-area-node/text-area-node.component';
import {InsightsAutoTemplate} from './insights/insights.auto.template';
import {InsightsService} from './insights/Insights.service';
import {FilterPipe, RemoveRepeatPipe} from './pipes/filter.pipe';
import {RadioNodeListComponent} from './radio-node-list/radio-node-list.component';
import {InsightsDirective} from './insights/insights.directive';
import {ArrayNodeComponent} from './array-node/array-node.component';
import {FormsModule} from '@angular/forms';
import {ObjectNodeComponent} from './object-node/object-node.component';
import {UnknownNodeComponent} from './unknown-node/unknown-node.component';
import {NotFoundStepComponent} from './not-found-step/not-found-step.component';
import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PhoneNumberFormatPipe } from './pipes/phone-number.pipe';
import { SsnNumberFormatPipe } from './pipes/ssn-number.pipe';
import {CustomLumenService} from "./services/custom.lumen.service";
import { NgSelectModule } from '@ng-select/ng-select';

export function pilots(customLumenService: CustomLumenService): PilotFactoryResolver {
  const factories = {
    featurelinear: async (config: PilotFactoryConfig = {}) => customLumenService.createFeatureLinerPilot(config.feature, config.refId),
  };
  return factories;
}


@NgModule(
  {
    imports: [
      BrowserAnimationsModule,
      LumenModule,
      FormsModule,
      HttpClientModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatInputModule,
      MatNativeDateModule,
      MatSelectModule,
      MatTabsModule,
      MatButtonModule,
      MatRadioModule,
      MatButtonToggleModule,
      MatRadioModule,
      MatCardModule,
      MatExpansionModule,
      MatFormFieldModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      NgSelectModule
    ],
    exports: [
      LumenModule,
      FormsModule,
      HttpClientModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatRadioModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatSelectModule,
      MatCardModule,
      MatExpansionModule,
      NodeLayoutComponent,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      UiConfigNodeDirective,
      AutoStepComponent,
      ResumeNodeComponent,
      FilterPipe,
      RemoveRepeatPipe,
      InsightsDirective
    ],
    declarations: [
      BooleanNodeComponent,
      CtaStepComponent,
      DateNodeComponent,
      ImageCaptureNodeComponent,
      ImageNodeComponent,
      NodeLayoutComponent,
      NoStepComponent,
      SignatureNodeComponent,
      SimpleFormStepComponent,
      StringNodeComponent,
      TextNodeComponent,
      ModalStepComponent,
      TabStepComponent,
      RadioNodeComponent,
      DoneStepComponent,
      UiConfigNodeDirective,
      PasswordNodeComponent,
      PhoneNumberNodeComponent,
      DateTimeNodeComponent,
      SsnNodeComponent,
      CheckboxNodeComponent,
      AutoStepComponent,
      ResumeNodeComponent,
      BarcodeNodeComponent,
      LabelNodeComponent,
      SectionFormComponent,
      BasicFormComponent,
      TextAreaNodeComponent,
      InsightsAutoTemplate,
      FilterPipe,
      RemoveRepeatPipe,
      RadioNodeListComponent,
      InsightsDirective,
      ArrayNodeComponent,
      NotFoundStepComponent,
      ObjectNodeComponent,
      UnknownNodeComponent
    ],
    providers: [
      TranslatePipe,
      DatePipe,
      PhoneNumberFormatPipe,
      SsnNumberFormatPipe,
      CustomLumenService,
      {
        multi: true,
        provide: LUMEN_STEP_TEMPLATES,
        useValue: {
          notFound: NotFoundStepComponent,
          cta: CtaStepComponent,
          simpleForm: SimpleFormStepComponent,
          undefined: NoStepComponent,
          modal: ModalStepComponent,
          tabs: TabStepComponent,
          endStep: DoneStepComponent,
          autos: AutoStepComponent,
          sectionForm: SectionFormComponent,
          basicForm: BasicFormComponent,
          insightsStart: InsightsAutoTemplate
        },
      },
      {
        multi: true,
        provide: LUMEN_NODE_COMPONENTS,
        useValue: [
          {component: ArrayNodeComponent, contentType: undefined, format: undefined, type: 'array', uiHint: undefined},
          {component: BooleanNodeComponent, contentType: undefined, format: undefined, type: 'boolean', uiHint: undefined},
          {component: StringNodeComponent, contentType: undefined, format: undefined, type: 'string', uiHint: undefined},
          {component: StringNodeComponent, contentType: undefined, format: undefined, type: 'integer', uiHint: undefined},
          {component: StringNodeComponent, contentType: undefined, format: undefined, type: 'number', uiHint: undefined},
          {component: ImageNodeComponent, contentType: 'image', format: 'uri', type: 'string', uiHint: undefined},
          {component: TextNodeComponent, contentType: 'text', format: 'uri', type: 'string', uiHint: undefined},
          {component: ObjectNodeComponent, contentType: undefined, format: undefined, type: 'object', uiHint: undefined},
          {component: TextNodeComponent, contentType: 'text', format: 'uri', type: 'string', uiHint: undefined},
          {component: UnknownNodeComponent, contentType: undefined, format: undefined, type: undefined, uiHint: undefined},
          {component: ProgressBarComponent, contentType: undefined, type: 'string', format: undefined, uiHint: 'ProgressBarComponent'},
          {component: DateNodeComponent, contentType: undefined, format: undefined, type: 'string', uiHint: 'dateOnly'},

          {component: SignatureNodeComponent, contentType: undefined, format: 'base64', type: 'string', uiHint: 'digitised-signature'},
          {component: ImageCaptureNodeComponent, contentType: undefined, format: 'base64', type: 'string', uiHint: 'image-capture'},
          {component: RadioNodeComponent, contentType: undefined, format: undefined, type: 'string', uiHint: 'radio'},
          {component: PasswordNodeComponent, contentType: undefined, format: undefined, type: 'string', uiHint: 'password'},
          {component: DateTimeNodeComponent, contentType: undefined, format : undefined, type: 'string', uiHint: 'date-time'},
          {component: PhoneNumberNodeComponent, contentType: undefined, format : undefined, type: 'string', uiHint: 'phoneNumber'},
          {component: SsnNodeComponent, contentType: undefined, format: undefined, type: 'string', uiHint: 'ssnNumber'},
          {component: CheckboxNodeComponent, contentType: undefined, format : undefined, type: 'boolean', uiHint: 'checkbox'},
          {component: ResumeNodeComponent, contentType: undefined, format: undefined, type: 'string', uiHint: 'resume'},
          {component: BarcodeNodeComponent, contentType: undefined, format: 'base64', type: 'string', uiHint: 'barcode-capture'},
          {component: BarcodeNodeComponent, contentType: undefined, format: undefined, type: 'string', uiHint: 'barcode-capture'},
          {component: LabelNodeComponent, contentType: undefined, format : undefined, type: 'string', uiHint: 'labelDisp'},
          {component: TextAreaNodeComponent, contentType: undefined, type: 'string', format: undefined, uiHint: 'textArea'},
          {component: RadioNodeListComponent, contentType: undefined, type: 'string', format: undefined, uiHint: 'radioList'}
        ],
      },
      {
        deps: [CustomLumenService],
        multi: true,
        provide : LUMEN_PILOT_FACTORY,
        useFactory: pilots
      },
      Camera,
      BarcodeScanner,
      InsightsService,
      TranslatePipe
    ],
    entryComponents: [
      BooleanNodeComponent,
      CtaStepComponent,
      DateNodeComponent,
      ImageCaptureNodeComponent,
      ImageNodeComponent,
      NoStepComponent,
      SignatureNodeComponent,
      SimpleFormStepComponent,
      StringNodeComponent,
      TextNodeComponent,
      ModalStepComponent,
      TabStepComponent,
      RadioNodeComponent,
      DoneStepComponent,
      PasswordNodeComponent,
      PhoneNumberNodeComponent,
      DateTimeNodeComponent,
      SsnNodeComponent,
      CheckboxNodeComponent,
      AutoStepComponent,
      ResumeNodeComponent,
      BarcodeNodeComponent,
      LabelNodeComponent,
      SectionFormComponent,
      BasicFormComponent,
      TextAreaNodeComponent,
      InsightsAutoTemplate,
      RadioNodeListComponent,
      ArrayNodeComponent,
      NotFoundStepComponent,
      ObjectNodeComponent,
      UnknownNodeComponent,
    ],
  },
)

export class TemplateLibraryModule {
}
