import { Component, OnInit } from '@angular/core';
import { NodeComponentAbstract } from '@lumen/client-angular';

@Component({
  styleUrls: ['./string-node.component.scss'],
  templateUrl: './string-node.component.html',
})
export class StringNodeComponent extends NodeComponentAbstract implements OnInit {
  public type = 'text';
  public user = {userName: ""};

  public ngOnInit(): void {
    // Note: formats 'email', 'password', etc. not currently supported by
    // Platform.
    switch (this.node.type) {
      case 'number':
      case 'integer':
        this.type = 'number';
        break;
      default:
        return;
    }
  }
}
