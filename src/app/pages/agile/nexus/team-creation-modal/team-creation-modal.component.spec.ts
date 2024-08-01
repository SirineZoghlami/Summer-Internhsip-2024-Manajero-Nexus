import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreationModalComponent } from './team-creation-modal.component';

describe('TeamCreationModalComponent', () => {
  let component: TeamCreationModalComponent;
  let fixture: ComponentFixture<TeamCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCreationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
