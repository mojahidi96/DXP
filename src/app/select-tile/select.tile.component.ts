import {Component, Input} from '@angular/core';
import * as jsonPath from 'jsonpath/jsonpath';
import {SelectTileConfigInterface} from "./select.tile.config.interface";
import {StepComponentAbstract} from "@lumen/client-angular";
import {parseResponse} from "../../template-library/services/app.util";


@Component(
  {
    selector: "select-tile",
    templateUrl: './select-tile.html',
    styleUrls: ['./select-tile.scss'],
  }
)

export class SelectTileComponent extends StepComponentAbstract {
  public config: SelectTileConfigInterface;
  public packages: any;
  public featuresList: any;
  public packageSelected: any;
  public isDisabled: boolean;
  public totalStars: number= 3;

  public data: any;
  @Input() public tileData: any;
  ngOnInit(): void {
    if(this.rootNode){
    this.data = this.rootNode.getValue();
    }
    else{
      this.data = this.tileData;
    }

    this.packageSelected = {};
    this.isDisabled = true;

    if (this.config) {
      if (this.config.displayType == null || this.config.displayType === undefined) {
        this.config.displayType = 'single';
      } 
      if (this.config.responseQuery) {
        console.log(jsonPath.query(this.data, this.config.responseQuery));
        this.packages = jsonPath.query(this.data, this.config.responseQuery);
      }
      if (this.config.childNodeName) {
        this.featuresList = jsonPath.query(this.data, this.config.childNodeName);
        this.featuresList = this.removeDuplicates(this.featuresList);
        console.log(this.featuresList);
      }
    }
  }

  private removeDuplicates(featuresList: any) {
    return featuresList.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj["featureName"]).indexOf(obj['featureName']) === pos;
    });
  }

  public doesFeatureExists(pack: any, feature: any) {
    for (let x of pack.features) {
      if (x.featureName === feature.featureName) {
        return true;
      }
    }
    return false;
  }

  public getFeatureNumber(pack: any, feature: any) {
    for (let x of pack.features) {
      if (x.featureName === feature.featureName) {
        return x.number;
      }
    }
    return "-";
  }

  public getFeatureDescription(pack: any, feature: any) {
    for (let x of pack.features) {
      if (x.featureName === feature.featureName) {
        return x.featureDesc;
      }
    }
    return "-";
  }

  public selectPackage(pack: any) {
    this.isDisabled = false;
    if (this.packageSelected != null && this.packageSelected !== undefined) {
      this.packageSelected = pack;
    } else {
      this.packageSelected = null;
      this.packageSelected = pack;
    }
  }

  public submitPack() {
    if (this.packageSelected) {
      let node = this.rootNode.findNode(this.config.selectedNode);
      if (node) {
        let data = {};
        for (let field of this.config.fields) {
          data[field.setVal] = this.packageSelected[field.getVal];
        }
        node.setValue([data]);
      }
      this.submit.emit();
    }
  }

  getStars(totalStars) {
    return Array.from(Array(totalStars).keys());
  }
}
