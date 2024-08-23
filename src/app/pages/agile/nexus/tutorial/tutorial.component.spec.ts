console.log('Test file loaded'); // Add this line to check if the file is loaded

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TutorialComponent } from './tutorial.component';
import { TutorialService } from '../../../../../services/tutorial.service';
import { ConfirmationDialogComponent } from '../../../agile/nexus/confirmation-dialog/confirmation-dialog.component';
import { By } from '@angular/platform-browser';

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;
  let mockTutorialService: jasmine.SpyObj<TutorialService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDialogService: jasmine.SpyObj<NbDialogService>;
  let mockToastrService: jasmine.SpyObj<NbToastrService>;

  beforeEach(async () => {
    mockTutorialService = jasmine.createSpyObj('TutorialService', ['getLastCreatedTutorial', 'deleteTutorial']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialogService = jasmine.createSpyObj('NbDialogService', ['open']);
    mockToastrService = jasmine.createSpyObj('NbToastrService', ['danger', 'success']);

    await TestBed.configureTestingModule({
      declarations: [TutorialComponent],
      providers: [
        { provide: TutorialService, useValue: mockTutorialService },
        { provide: Router, useValue: mockRouter },
        { provide: NbDialogService, useValue: mockDialogService },
        { provide: NbToastrService, useValue: mockToastrService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the last created tutorial on initialization', () => {
    const tutorial = { id: '1', introduction: 'Intro', whyUse: 'Why', whatIsNexus: 'What', howDoesItWork: 'How', limitations: 'Limitations', applyingNexus: 'Apply', conclusion: 'Conclusion' };
    mockTutorialService.getLastCreatedTutorial.and.returnValue(of(tutorial));
    
    component.ngOnInit();
    
    expect(component.lastCreatedTutorial).toEqual(tutorial);
    expect(component.isDatabaseEmpty).toBeFalsy();
  });

  it('should handle error when fetching the last created tutorial', () => {
    mockTutorialService.getLastCreatedTutorial.and.returnValue(throwError(() => new Error('Fetch error')));
    
    component.ngOnInit();
    
    expect(component.isDatabaseEmpty).toBeTruthy;
    expect(mockToastrService.danger).toHaveBeenCalledWith('Failed to fetch tutorial');
  });

  it('should navigate to quiz page', () => {
    component.navigateToQuiz();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/quizz']);
  });

  it('should navigate to create page when trying this method', () => {
    component.tryThisMethod();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/project/create']);
  });

  it('should navigate to update page if a tutorial exists', () => {
    component.lastCreatedTutorial.id = '1';
    component.modifyTutorial();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/tutorial/update', '1']);
  });

  it('should open confirmation dialog on delete', () => {
    const dialogRef = { onClose: of(true) };
    mockDialogService.open.and.returnValue(dialogRef as any);
    spyOn(component, 'deleteTutorial');
    
    component.confirmDelete();
    
    expect(mockDialogService.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this tutorial?'
      }
    });
    expect(component.deleteTutorial).toHaveBeenCalled();
  });

  it('should delete tutorial if confirmed', () => {
    component.lastCreatedTutorial.id = '1';
    mockDialogService.open.and.returnValue({ onClose: of(true) } as any);
    mockTutorialService.deleteTutorial.and.returnValue(of(null));
    
    component.deleteTutorial();
    
    expect(mockToastrService.success).toHaveBeenCalledWith('Tutorial deleted successfully');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/tutorial/create']);
  });

  it('should handle error during tutorial deletion', () => {
    component.lastCreatedTutorial.id = '1';
    mockDialogService.open.and.returnValue({ onClose: of(true) } as any);
    mockTutorialService.deleteTutorial.and.returnValue(throwError(() => new Error('Delete error')));
    
    component.deleteTutorial();
    
    expect(mockToastrService.danger).toHaveBeenCalledWith('Failed to delete tutorial');
  });

  it('should change steps correctly', () => {
    component.currentStepIndex = 0;
    component.nextStep();
    expect(component.currentStepIndex).toBe(1);
    
    component.previousStep();
    expect(component.currentStepIndex).toBe(0);
  });

  it('should get sanitized content', () => {
    const content = '<p>Some content</p>';
    const sanitizedContent = component.getSanitizedContent(content);
    expect(sanitizedContent).toBeDefined();
  });
});
