import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusTimelineComponent } from './nexus-timeline.component';

describe('NexusTimelineComponent', () => {
  let component: NexusTimelineComponent;
  let fixture: ComponentFixture<NexusTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
