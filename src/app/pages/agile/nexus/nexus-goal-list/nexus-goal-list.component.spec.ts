import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusGoalListComponent } from './nexus-goal-list.component';

describe('NexusGoalListComponent', () => {
  let component: NexusGoalListComponent;
  let fixture: ComponentFixture<NexusGoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusGoalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
