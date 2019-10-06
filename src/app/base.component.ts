import {Component, Inject, Injector, ViewChild} from '@angular/core';

import {MatSnackBar} from "@angular/material";


import {RestartService} from "../template-library/services/com.service";
import {BpeEvent, DoneEvent, LUMEN_CLIENT_CONFIG, StepTemplateOutletDirective} from "@lumen/client-angular";
import {appInjector} from "../template-library/services/app.util";
import {BpeResolveClass} from "@lumen/core-js";


export class BaseComponent {

  @ViewChild(StepTemplateOutletDirective) public stepTemplateOutlet: StepTemplateOutletDirective;

  public state: 'flow' | 'bpe' | 'done' = 'flow';
  public bpe: BpeEvent;
  public bpeResolveClass = BpeResolveClass;

  public snackBar: any;
  public restartService: RestartService;

  constructor(@Inject(LUMEN_CLIENT_CONFIG) public config: any) {
    this.setInstantiations();
    this.restartService.restartSource$.subscribe(
      ref => {
        if (ref && this.stepTemplateOutlet) {
          this.stepTemplateOutlet.refId = ref;
          this.restartApp();
        }
      }
    );
  }

  public displayBPE(event: BpeEvent): void {
    this.bpe = event;
    this.snackBar.open(event.bpe.eventMessage, '', {duration: 2000});
  }

  public throwError(event: ErrorEvent): void {
    this.snackBar.open('An error occurred.', '', {duration: 2000});
  }

  public complete(event: DoneEvent) {
    this.restartApp();
  }

  public restartApp(): void {
    this.bpe = undefined;
    this.state = 'flow';
    this.stepTemplateOutlet.restart();
  }

  private setInstantiations() {
    let injector: Injector = appInjector();
    if (injector) {
      this.snackBar = injector.get(MatSnackBar);
      this.restartService = injector.get(RestartService);
    }
  }
}
