import { Component, Input } from '@angular/core';
import {Node, PrimitiveNode} from '@lumen/core-js';


@Component({
    selector: "uit-node-layout",
    styleUrls: ['./node-layout.component.scss'],
    templateUrl: './node-layout.component.html',
})
export class NodeLayoutComponent {
    @Input() public node: Node | PrimitiveNode;
}
