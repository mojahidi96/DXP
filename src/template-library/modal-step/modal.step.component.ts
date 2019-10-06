import {Component, OnInit} from '@angular/core';

import {ModalStepConfigInterface} from "./modal-step-config.interface";


import {StepComponentAbstract} from '@lumen/client-angular';
import {ModalService} from './modal.service';


@Component(
    {
        styleUrls: ['./modal-step.scss'],
        templateUrl: './modal-step.html',
    }
)

export class ModalStepComponent extends StepComponentAbstract implements OnInit{

    public config: ModalStepConfigInterface;

    constructor(private modalService: ModalService) {
        super();
    }

    ngOnInit(): void {
        if(this.config != null && this.config !== undefined && this.config.onLoad){
            this.openConfirmDialog();
        }
    }

    openConfirmDialog(): void {

        this.modalService.confirm(
            {
                cancelLabel: this.config.cancelLabel,
                confirmLabel: this.config.confirmLabel,
                message: this.config.message,
                title: this.config.title,
                type : this.config.modalType,
                fields: this.config.fields,
            }).afterClosed().subscribe((result) => {
                if (result && result.result) {
                    this.config.fields.forEach((field) => {
                        const node = this.rootNode.findNode(field.nodeName);
                        if (node) {
                            node.setValue(field.value, false);
                        }
                    });
                    this.submit.emit();
                }
        });
    }
}
