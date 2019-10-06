import { Component } from '@angular/core';
import {NodeComponentAbstract} from '@lumen/client-angular';


@Component({
    styleUrls: ['./label-node.scss'],
    templateUrl: './label-node.html',
})
export class LabelNodeComponent extends NodeComponentAbstract {
    public type = 'text';
    public error = false;
}
