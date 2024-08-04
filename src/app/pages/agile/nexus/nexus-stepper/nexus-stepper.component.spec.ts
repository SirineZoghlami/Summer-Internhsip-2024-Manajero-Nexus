import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusStepperComponent } from './nexus-stepper.component';

describe('NexusStepperComponent', () => {
  let component: NexusStepperComponent;
  let fixture: ComponentFixture<NexusStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
