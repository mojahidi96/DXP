import {Component, OnInit} from "@angular/core";
import {SelectCustomConfigInterface} from "./select.custom.config.interface";
import * as jsonPath from 'jsonpath/jsonpath';
import {StepComponentAbstract} from "@lumen/client-angular";

@Component(
  {
    selector: "select-custom",
    templateUrl: './select-custom.html',
    styleUrls: ['./select-custom.scss']
  }
)

export class SelectCustomComponent extends StepComponentAbstract implements OnInit {
  public config: SelectCustomConfigInterface;
  public customizations: any;
  public checkSelected: any[] = [];
  public radioSelected: any;
  public selectOption: any;
  public selectedValue: any;
  public selectedInfo: any[] = [];

  public data;

  ngOnInit(): void {
    this.data = this.rootNode.getValue();

    this.radioSelected = new Map();
    if (this.config.respJsonPath) {
      console.log(jsonPath.query(this.data, this.config.respJsonPath));
      this.customizations = jsonPath.query(this.data, this.config.respJsonPath);
    }
  }

  onChangeCheckBox(choice: any) {
    let index = this.checkSelected.indexOf(choice);
    if (index > -1) {
      this.checkSelected.splice(index, 1);
    } else {
      this.checkSelected.push(choice);
    }
  }

  onChangeRadio(choice: any, id: any) {
    this.radioSelected.set(id, choice);
  }

  onChangeSelect(choice: any) {
    if (choice.value) {
      this.selectOption = choice.value;
    }
  }

  onSubmit(): void {
    if (this.checkSelected.length > 0) {
      this.selectedInfo = this.checkSelected;
    }
    if (this.radioSelected.size > 0) {
      this.radioSelected.forEach((value: boolean, key: string) => {
        this.selectedInfo.push(value);
      });
    }
    if (this.selectOption != null && this.selectedInfo != undefined) {
      this.selectedInfo.push(this.selectOption);
    }

    if (this.selectedInfo) {
      let node = this.rootNode.findNode(this.config.selectedNode);
      if (node) {
        let dataArr: any[] = [];
        for (let selectInfo of this.selectedInfo) {
          let data = {};
          for (let field of this.config.fields) {
            data[field.setVal] = selectInfo[field.getVal];
          }
          dataArr.push(data);

        }
        node.setValue(dataArr);
      }
      this.submit.emit();
    }
  }

  public getItemKey(key: string): string {
    if (key === 'Set Top Boxes') {
      return "tv_set_top_box_number";
    } else if (key === 'Sports') {
      return "tv_sports_package";
    } else if (key === 'International TV') {
      return "tv_international_package";
    } else {
      return null;
    }
  }

}
