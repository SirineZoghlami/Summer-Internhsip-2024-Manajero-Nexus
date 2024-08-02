import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusCalendarComponent } from './nexus-calendar.component';

describe('NexusCalendarComponent', () => {
  let component: NexusCalendarComponent;
  let fixture: ComponentFixture<NexusCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
