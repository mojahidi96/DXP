import { Component, Input, Output } from '@angular/core';

import {StepComponentAbstract} from "@lumen/client-angular";
import { EventEmitter } from 'events';


@Component({
  templateUrl: 'grid-tiles-component.html',
  styleUrls: ['grid-tiles-component.scss'],
})
export class GridTileComponent extends StepComponentAbstract{
  public config;
  public data;
  selected="";
  sortedList: Array<any> = [];
  searchText: string;
  manufactureItem: any;

  constructor(){
    super();
  }

  ngOnInit(){
    this.generateTiles();
  }
  onsubmit(){
    if(this.rootNode){
      let selectednode = this.rootNode.findNode(this.config.componentSelectionNode);
      if(selectednode){
        selectednode.setValue(this.selected);
      }
    }
  }

  generateTiles(){
    let row_tiles = []
    this.config.fields.forEach((tile,index) =>{
      if((index+1)%3 === 0){
        row_tiles.push(tile);
        this.sortedList.push(row_tiles)
        row_tiles = [];
      }else{
        row_tiles.push(tile);
      }
    });
  }
}
