import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCreationModalComponent } from './sprint-creation-modal.component';

describe('SprintCreationModalComponent', () => {
  let component: SprintCreationModalComponent;
  let fixture: ComponentFixture<SprintCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintCreationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
