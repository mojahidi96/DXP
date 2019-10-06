import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NodeComponentAbstract} from '@lumen/client-angular';


@Component({
  selector: 'uit-demo-radio-node-list',
  templateUrl: './radio-node-list.component.html',
  styleUrls: ['./radio-node-list.component.scss']
})
export class RadioNodeListComponent extends NodeComponentAbstract implements OnInit {
  selectedRadio: any;
  radioList;
  selectedGetPaid;
  @Output() public sendData = new EventEmitter<any>();
  ngOnInit(): void {
    this.radioList = JSON.parse(this.node.value)
    if (this.radioList[0].type == "selectBox") {
      this.selectedGetPaid = this.radioList[0].contentHtml[0];
    }
    this.selectedRadio = this.radioList[0].label
  }

  setValue(nodeItem) {
    this.sendData.emit(nodeItem)
    //let node = this.node.findNode('CommonFields.SelectedDeviceSummary.selectedGetPaid');
  }


}
