import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ResumeNodeComponent} from './resume-node.component';

describe('ResumeNodeComponent', () => {
  let component: ResumeNodeComponent;
  let fixture: ComponentFixture<ResumeNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
