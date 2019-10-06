import { Component, OnInit } from '@angular/core';
import { NodeComponentAbstract } from '@lumen/client-angular';
import { ObjectNode } from '@lumen/core-js';

@Component({
  templateUrl: './object-node.component.html',
})
export class ObjectNodeComponent extends NodeComponentAbstract implements OnInit {
  public node: ObjectNode;
  public nodes: string[] = [];

  public ngOnInit(): void {
    this.nodes = Object.keys(this.node.children);
  }
}
