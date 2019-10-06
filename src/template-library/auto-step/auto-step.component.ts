import { Component, OnInit } from '@angular/core';

import * as jsonPath from 'jsonpath/jsonpath';
import {AutoStepConfig} from "./auto-step-config.interface";

import {ActivatedRoute} from "@angular/router";
import {StepComponentAbstract} from '@lumen/client-angular';


@Component({
    templateUrl: './auto-step.component.html',
    styleUrls: ['./auto-step.component.scss']
})

export class AutoStepComponent extends StepComponentAbstract implements OnInit {
    public config: AutoStepConfig;
    public error = '';

    constructor(
        private route: ActivatedRoute,
    ) {
        super();
    }

    ngOnInit() {
        if (!this.config.fields || !this.config.fields.length) {
            this.submit.emit();
        } else {
            this.autoStepOnConfig();
        }
    }

    private autoStepOnConfig() {
        let data;

        for(let field of this.config.fields){
            if(field && field.type){
                if(field.type === 'location.search'){
                    data = this.getLocationSearch();
                    this.setData(data);
                } else if(field.type === 'router-id'){
                    //Type Constant
                    data = this.route.snapshot.params.id;
                    this.setData(data);
                }
            }
        }

        this.submit.emit();
    }

    private setData(data:any) {
        const query = data;
        const ctx = {query};
        const types = {
            constant: x => ctx.query,
            'json-path': x => jsonPath.query(ctx, x)
        };

        for(let field of this.config.fields){
            const node = this.rootNode.findNode(field.fieldPath);
            const evaluator = types[field.exprType];
            if (node && evaluator) {
                const value = evaluator(field.expression);
                node.setValue(value, false);
                // Work around jsonpath liking to return arrays regardless of query type
                if (node.getValue() !== value && Array.isArray(value)) {
                    node.setValue(value[0], false);
                }
            }
        }
    }

    private getLocationSearch() {
        const paramsBlock = window.location.search ? window.location.search.split('?')[1] : '';
        const query = paramsBlock.split('&').reduce((p, c) => {
            const components = c.split('=');
            p[components[0]] = components[1];
            return p;
        }, new Map<string, string>());
        return query;
    }
}
