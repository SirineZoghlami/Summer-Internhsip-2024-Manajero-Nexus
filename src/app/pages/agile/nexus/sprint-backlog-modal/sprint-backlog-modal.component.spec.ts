import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBacklogModalComponent } from './sprint-backlog-modal.component';

describe('SprintBacklogModalComponent', () => {
  let component: SprintBacklogModalComponent;
  let fixture: ComponentFixture<SprintBacklogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintBacklogModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintBacklogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
