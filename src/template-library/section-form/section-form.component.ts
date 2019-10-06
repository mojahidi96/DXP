/**
 * Created by adil0001 on 10/29/2018.
 */
import {Component, OnInit} from '@angular/core';

import {Field, Section, SectionFormConfigInterface} from './section-form-config.interface';
import {StepComponentAbstract} from '@lumen/client-angular';

@Component({
  styleUrls: ['./section-form.component.scss'],
  templateUrl: './section-form.component.html',
})
export class SectionFormComponent extends StepComponentAbstract implements OnInit {

  public config: SectionFormConfigInterface;
  public data: any;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.hiddenFieldRequired();
    this.data = this.rootNode.getValue();
  }

  public getNode(section: Section): any {
    if (section && section.internalNodeName) {
      let node = this.rootNode.findNode(section.internalNodeName);
      return node;
    }
    return this.rootNode;
  }

  private hiddenFieldRequired() {
    if (this.config && this.config.sections) {
      for (let section of this.config.sections) {
        if (section && section.actionProperties && section.actionProperties.fields && section.action == 'hide') {
          for (let field of section.actionProperties.fields) {
            if (field) {
              let node = this.rootNode.findNode(field.setNode);
              if (node) {
                (node as any).required = false;
              }
            }
          }
        }
      }
    }
  }


  public eventAction(event: any, section: any): void {
    if (section) {
      let node = this.rootNode.findNode(section.actionProperties.selectNodeName);
      let conf = this.config.sections[section.actionProperties.sectionPosition];
      let isCheckValue: boolean = false;
      if (node && node.getValue().toString() === section.actionProperties.checkValue) {
        isCheckValue = true;
      }

      if (section.action && section.action === 'hide' && node && conf) {
        if (conf) {
          conf.hidden = !isCheckValue;
        }
        this.setValidationFields(section, isCheckValue);
      }
      if (section.action && section.action === 'populate-data' && node) {
        this.operateNode(section.actionProperties.fields, isCheckValue);
      }
    }
  }

  private operateNode(fields: Field[], isCheckValue: boolean) {
    if (fields && fields.length > 0) {
      for (let field of fields) {
        let node1 = this.rootNode.findNode(field.getNode);
        let node2 = this.rootNode.findNode(field.setNode);
        if (node1 && node2) {
          if (isCheckValue) {
            node2.setValue(node1.getValue());
          } else {
            node2.setValue();
          }
        }
      }
    }
  }

  private setValidationFields(section: any, isVal: boolean) {
    if (section.actionProperties) {
      for (let field of section.actionProperties.fields) {
        if (field) {
          let node = this.rootNode.findNode(field.setNode);
          if (node) {
            (node as any).required = isVal;
            //TODO: GET The Readonly changed.
            //node.required = isVal;
          }
        }
      }
    }
  }

  public submitForm(): void {
    if (!this.rootNode.validate()) {
      this.submit.emit();
    }
  }

}
