import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusGoalComponent } from './nexus-goal.component';

describe('NexusGoalComponent', () => {
  let component: NexusGoalComponent;
  let fixture: ComponentFixture<NexusGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
