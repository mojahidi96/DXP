/**
 * Created by adil0001 on 1/22/2019.
 */
import {Component} from '@angular/core';
import {NodeComponentAbstract} from '@lumen/client-angular';


@Component(
    {
        templateUrl: './text-area-node.component.html',
        styleUrls: ['./text-area-node.scss']
    }
)

export class TextAreaNodeComponent extends NodeComponentAbstract{}
