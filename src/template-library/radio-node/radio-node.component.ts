import { Component} from '@angular/core';
import {NodeComponentAbstract} from '@lumen/client-angular';

@Component(
    {
        templateUrl: './radio-node.component.html',
        styleUrls: ['./radio-node.scss']
    }
)

export class RadioNodeComponent extends NodeComponentAbstract{}
