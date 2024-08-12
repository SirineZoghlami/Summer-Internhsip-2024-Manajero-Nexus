import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusProductBacklogModalComponent } from './nexus-product-backlog-modal.component';

describe('NexusProductBacklogModalComponent', () => {
  let component: NexusProductBacklogModalComponent;
  let fixture: ComponentFixture<NexusProductBacklogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusProductBacklogModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusProductBacklogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
