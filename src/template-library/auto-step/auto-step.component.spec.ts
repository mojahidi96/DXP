import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoStepComponent } from './auto-step.component';

describe('AutoStepComponent', () => {
    let component: AutoStepComponent;
    let fixture: ComponentFixture<AutoStepComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AutoStepComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutoStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
