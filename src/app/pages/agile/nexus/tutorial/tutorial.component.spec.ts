import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TutorialComponent } from './tutorial.component';
import { TutorialService } from '../../../../core/services/nexus-services/tutorial.service';
import { Tutorial } from '../../../../core/models/nexus-models/tutorial.model';
import { ConfirmationDialogComponent } from '../../../agile/nexus/confirmation-dialog/confirmation-dialog.component';

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let tutorialServiceSpy: jasmine.SpyObj<TutorialService>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;
  let dialogServiceSpy: jasmine.SpyObj<NbDialogService>;
  let toastrServiceSpy: jasmine.SpyObj<NbToastrService>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const tutorialServiceSpyObj = jasmine.createSpyObj('TutorialService', ['getLastCreatedTutorial', 'deleteTutorial']);
    const sanitizerSpyObj = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    const dialogServiceSpyObj = jasmine.createSpyObj('NbDialogService', ['open']);
    const toastrServiceSpyObj = jasmine.createSpyObj('NbToastrService', ['success', 'danger']);

    await TestBed.configureTestingModule({
      declarations: [TutorialComponent],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: TutorialService, useValue: tutorialServiceSpyObj },
        { provide: DomSanitizer, useValue: sanitizerSpyObj },
        { provide: NbDialogService, useValue: dialogServiceSpyObj },
        { provide: NbToastrService, useValue: toastrServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    tutorialServiceSpy = TestBed.inject(TutorialService) as jasmine.SpyObj<TutorialService>;
    sanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
    dialogServiceSpy = TestBed.inject(NbDialogService) as jasmine.SpyObj<NbDialogService>;
    toastrServiceSpy = TestBed.inject(NbToastrService) as jasmine.SpyObj<NbToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the last created tutorial on initialization', () => {
    const mockTutorial: Tutorial = {
      id: '1',
      introduction: 'Intro',
      whyUse: 'Why Use',
      whatIsNexus: 'What is Nexus',
      howDoesItWork: 'How Does It Work',
      limitations: 'Limitations',
      applyingNexus: 'Applying Nexus',
      conclusion: 'Conclusion',
      processImageUrl: '',
      roleImageUrl: ''
    };

    tutorialServiceSpy.getLastCreatedTutorial.and.returnValue(of(mockTutorial));
    component.ngOnInit();
    expect(component.lastCreatedTutorial).toEqual(mockTutorial);
    expect(component.isDatabaseEmpty).toBeFalsy();
  });

  it('should handle error when fetching the last created tutorial', () => {
    tutorialServiceSpy.getLastCreatedTutorial.and.returnValue(throwError('Error fetching tutorial'));
    component.ngOnInit();
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to fetch tutorial');
  });

  it('should navigate to quiz', () => {
    component.navigateToQuiz();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/quizz']);
  });

  it('should navigate to the previous step', () => {
    component.currentStepIndex = 1;
    component.previousStep();
    expect(component.currentStepIndex).toBe(0);
  });

  it('should navigate to the next step', () => {
    component.currentStepIndex = 0;
    component.nextStep();
    expect(component.currentStepIndex).toBe(1);
  });

  it('should sanitize content', () => {
    const content = '<p>Test</p>';
    sanitizerSpy.bypassSecurityTrustHtml.and.returnValue(content);
    expect(component.getSanitizedContent(content)).toBe(content);
  });

  it('should navigate to modify tutorial', () => {
    component.lastCreatedTutorial.id = '1';
    component.modifyTutorial();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/tutorial/update', '1']);
  });

  it('should confirm delete tutorial', () => {
    dialogServiceSpy.open.and.returnValue({ onClose: of(true) } as any);
    spyOn(component, 'deleteTutorial');
    component.confirmDelete();
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this tutorial?'
      }
    });
    expect(component.deleteTutorial).toHaveBeenCalled();
  });

  it('should delete tutorial', () => {
    component.lastCreatedTutorial.id = '1';
    tutorialServiceSpy.deleteTutorial.and.returnValue(of(null));
    component.deleteTutorial();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Tutorial deleted successfully');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/tutorial/create']);
  });

  it('should handle error when deleting tutorial', () => {
    component.lastCreatedTutorial.id = '1';
    tutorialServiceSpy.deleteTutorial.and.returnValue(throwError('Error deleting tutorial'));
    component.deleteTutorial();
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to delete tutorial');
  });

  it('should return the correct image URL', () => {
    const imagePath = '/path/to/image.jpg';
    expect(component.getImageUrl(imagePath)).toBe('http://localhost:8085/ManajeroBackend/path/to/image.jpg');
  });
});