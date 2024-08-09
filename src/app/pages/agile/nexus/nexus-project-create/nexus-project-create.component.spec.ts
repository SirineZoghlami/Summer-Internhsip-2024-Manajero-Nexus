import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusProjectCreateComponent } from './nexus-project-create.component';

describe('NexusProjectCreateComponent', () => {
  let component: NexusProjectCreateComponent;
  let fixture: ComponentFixture<NexusProjectCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusProjectCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
