import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialComponent } from './tutorial.component'; // Adjust the path as per your actual component location

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialComponent ]
    })
    .compileComponents(); // Compile the component's template and CSS

    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to initialize the component
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Assert that the component is created successfully
  });
});
