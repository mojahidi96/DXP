import { Component, OnInit } from '@angular/core';
import { NodeComponentAbstract } from '@lumen/client-angular';
import { PrimitiveNode } from '@lumen/core-js';

@Component({
  templateUrl: './text-node.component.html',
})
export class TextNodeComponent extends NodeComponentAbstract implements OnInit {
  public node: PrimitiveNode;
  public errorMessage: string;

  public async ngOnInit(): Promise<void> {
    if (this.node.value) {
      try {
        await this.node.fetchContentByUri();
      } catch (error) {
        this.errorMessage = `Cannot load ${this.node.schema.contentType} content`;
      }
    }
  }
}
