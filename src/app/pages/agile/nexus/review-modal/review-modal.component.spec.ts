import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { of } from 'rxjs';
import { ReviewModalComponent } from './review-modal.component';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';

describe('ReviewModalComponent', () => {
  let component: ReviewModalComponent;
  let fixture: ComponentFixture<ReviewModalComponent>;
  let dialogRef: jasmine.SpyObj<NbDialogRef<ReviewModalComponent>>;
  let projectService: jasmine.SpyObj<NexusProjectService>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('NbDialogRef', ['close']);
    const projectServiceSpy = jasmine.createSpyObj('NexusProjectService', ['updateProject']);

    await TestBed.configureTestingModule({
      declarations: [ReviewModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: NbDialogRef, useValue: dialogRefSpy },
        { provide: NexusProjectService, useValue: projectServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewModalComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(NbDialogRef) as jasmine.SpyObj<NbDialogRef<ReviewModalComponent>>;
    projectService = TestBed.inject(NexusProjectService) as jasmine.SpyObj<NexusProjectService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog and return review data on submitReview', () => {
    component.reviewContent = 'This is a review';

    const currentDateTime = new Date().toISOString();
    const expectedReview = {
      reviewDate: currentDateTime,
      reviewContent: component.reviewContent
    };

    spyOn(Date.prototype, 'toISOString').and.returnValue(currentDateTime);

    component.submitReview();

    expect(dialogRef.close).toHaveBeenCalledWith(expectedReview);
  });
});
