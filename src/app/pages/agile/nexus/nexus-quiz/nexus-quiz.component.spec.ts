import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusQuizComponent } from './nexus-quiz.component';

describe('NexusQuizComponent', () => {
  let component: NexusQuizComponent;
  let fixture: ComponentFixture<NexusQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
