import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusProductBacklogComponent } from './nexus-product-backlog.component';

describe('NexusProductBacklogComponent', () => {
  let component: NexusProductBacklogComponent;
  let fixture: ComponentFixture<NexusProductBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusProductBacklogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusProductBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
