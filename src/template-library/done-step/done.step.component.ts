import {Component, OnInit} from '@angular/core';
import {StepComponentAbstract} from '@lumen/client-angular';


@Component(
    {
        templateUrl: './done-step.html',
    }
)
export class DoneStepComponent extends StepComponentAbstract implements OnInit{

    ngOnInit(): void {
        this.submit.emit();
    }
}
