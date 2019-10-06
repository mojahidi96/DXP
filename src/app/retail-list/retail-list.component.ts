import {Component, Input} from '@angular/core';

import {StepComponentAbstract} from "@lumen/client-angular";
import { RetailConfigInterface } from './retail-list.config.interface';


@Component(
  {
    selector: "retail-list",
    templateUrl: './retail-list.component.html',
    styleUrls: ['./retail-list.component.scss'],
  }
)

export class RetailListComponent extends StepComponentAbstract {
  public config: RetailConfigInterface;
  public retail:any;
  sortedList: Array<any> = [];
  public data: any;
  public selected;
  ngOnInit(): void {
    this.data = this.rootNode.getValue();
    this.retail = this.removeDuplicates(this.data.PimReatilCatalogList,'PIMId');
    this.generateTiles();
  }

  public removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}
  generateTiles(){
    let row_tiles =[];
    this.retail.forEach((element,index) => {
      if((index+1)%3 === 0){
        row_tiles.push(element);
        this.sortedList.push(row_tiles)
        row_tiles = [];
      }else{
        row_tiles.push(element);
      }
    });
  }

  onsubmit(selected){
    let pimId = this.rootNode.findNode(this.config.responseQuery);
    pimId.setValue(selected.PIMId);
  }
  public setPim(){
    this.submit.emit();
  }
}
