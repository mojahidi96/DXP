import { Component } from '@angular/core';
import { NodeComponentAbstract } from '@lumen/client-angular';
import { ArrayNode } from '@lumen/core-js';

@Component({
  templateUrl: './array-node.component.html',
})
export class ArrayNodeComponent extends NodeComponentAbstract {
  public node: ArrayNode;
}
