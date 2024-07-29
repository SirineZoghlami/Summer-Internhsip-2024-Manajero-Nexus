import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusBoardComponent } from './nexus-board.component';

describe('NexusBoardComponent', () => {
  let component: NexusBoardComponent;
  let fixture: ComponentFixture<NexusBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexusBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
