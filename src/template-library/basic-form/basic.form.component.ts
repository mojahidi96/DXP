import { Component } from '@angular/core';
import {BasicFormConfigInterface} from "./basic.form.config.interface";
import {StepComponentAbstract} from '@lumen/client-angular';


@Component(
    {
        templateUrl: './basic-form.html',
        styleUrls: ['./basic-form.scss'],
    }
)

export class BasicFormComponent extends StepComponentAbstract{
    public config: BasicFormConfigInterface;

    public submitForm(): void {
        if (!this.rootNode.validate()) {
            this.submit.emit();
        }
    }

}
