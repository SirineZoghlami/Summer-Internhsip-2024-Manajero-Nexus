import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusProjectComponent } from './nexus-project.component';

describe('NexusProjectComponent', () => {
  let component: NexusProjectComponent;
  let fixture: ComponentFixture<NexusProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
