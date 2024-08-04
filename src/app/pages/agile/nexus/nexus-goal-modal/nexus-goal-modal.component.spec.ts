import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusGoalModalComponent } from './nexus-goal-modal.component';

describe('NexusGoalModalComponent', () => {
  let component: NexusGoalModalComponent;
  let fixture: ComponentFixture<NexusGoalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusGoalModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusGoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
