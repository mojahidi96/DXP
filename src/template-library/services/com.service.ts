import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestartService {
  private restartSource = new Subject<string>();

  public restartSource$ = this.restartSource.asObservable();

  restart(ref: string) {
    this.restartSource.next(ref);
  }
}

@Injectable({
  providedIn: "root"
})
export class TemplateService {
  private feature = new Subject<any>();
  public featureSource$ = this.feature.asObservable();

  private tempSource = new Subject<any>();
  public tempSource$ = this.tempSource.asObservable();

  setInfo(data: any) {
    this.tempSource.next(data);
  }

  changeFeature(data: FeatureInfo) {
    this.feature.next(data);
  }
}

export interface FeatureInfo {
  instantiateFlow?: string;
  feature?: string;
}
