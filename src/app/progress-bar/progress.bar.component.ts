import {Component, OnInit, AfterViewInit} from '@angular/core';
import {StepComponentAbstract} from "@lumen/client-angular";


@Component(
  {
    selector: "progress-bar",
    templateUrl: './progress-bar.html',
    styleUrls: ['./progress.scss']
  }
)

export class ProgressBarComponent extends StepComponentAbstract implements OnInit, AfterViewInit {

  public position: number = 0;
  public display: boolean = false;
  public tiles: any[] = [];

  ngOnInit(): void {       

    if (this.config && this.config["progressTitle"]) {
      this.display = true;
    }
    if(this.rootNode){
      let progress = this.rootNode.findNode('CommonFields.ProgressTile');
      if (progress) {
        let data = progress.getValue();
        if (data) {
          data = data.slice(1, -1);
          let progressArr = data.split(",").map(item => {
            return item.trim();
          });
          if (progressArr && progressArr.length > 0) {
            this.tiles = progressArr;
            let pos = this.getTilePosition(this.tiles, this.config);
            if (pos) {
              this.position = pos;
            }
          }
        }
    }
  }
  }

  private getTilePosition(tiles: any[], config: any): number {
    if (config["progressTitle"]) {
      let configProgress = config["progressTitle"];
      if (configProgress) {
        let splitStr = configProgress.split(",");
        if (splitStr && splitStr.length > 0) {
          for (let str of splitStr) {
            if (tiles.indexOf(str) > -1) {
              return tiles.indexOf(str);
            }
          }
        }
      }
    }
    return 0;
  }

  ngAfterViewInit() {
    document.getElementById('main-section').scrollTop = 0;
  }
}
