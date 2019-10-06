import {Component, Input, OnInit} from '@angular/core';

import {ServiceTypeConfigInterface} from './service-type-config.interface';
import {StepComponentAbstract} from "@lumen/client-angular";
import {ResponseLike} from "@lumen/core-js";

@Component(
  {
    templateUrl: './service-type.html',
    styleUrls: ['./service-type.scss'],
  }
)

export class ServiceTypeComponent extends StepComponentAbstract implements OnInit {
  @Input() public data: ResponseLike;

  public config: ServiceTypeConfigInterface;
  public selectItems: any[] = [];
  public selectItemsString: string = "";

  public ngOnInit(): void {
    if (this.config != null && this.config !== undefined) {
      this.displayServiceType();

    }
    console.log(this.data);
  }

  public displayServiceType(): void {
    cancelLabel: this.config.cancelLabel;
    confirmLabel: this.config.confirmLabel;
    message: this.config.message;
    title: this.config.title;
    fields: this.config.fields;
  }

  public toggle(config: any) {
    //this.selectItems = this.selectItems.concat(config.label+ ",");
    let index = this.selectItems.indexOf(config.label);
    if (index > -1) {
      this.selectItems.splice(index, 1);
    } else {
      this.selectItems.push(config.label);
    }
    this.selectItemsString = this.selectItems.join(", ");

    let node = this.rootNode.findNode(config.selectedField);
    if (node && (node.getValue() === undefined || !node.getValue())) {
      node.setValue(true, false);
    } else if (node && node.getValue()) {
      node.setValue(false, false);
    }
  }

  public checkIsSelected(name: any) {
    var node = this.rootNode.findNode(name);
    if (node) {
      return node.getValue();
    }
    return false;
  }

  public checkValue(nodeField: any) {
    let node = this.rootNode.findNode(nodeField);
    if (node) {
      return node.getValue();
    }
    return false;
  }

  public submitForm(): void {
    if (!this.rootNode.validate()) {
      this.submit.emit();
    }
  }
}
