/**
 * Created by adil0001 on 11/21/2018.
 */
import { Component} from '@angular/core';
import {NodeComponentAbstract} from '@lumen/client-angular';


@Component(
    {
        templateUrl: './checkbox-node-component.html',
        styleUrls: ['./checkbox-node-component.scss']
    }
)

export class CheckboxNodeComponent extends NodeComponentAbstract{}
