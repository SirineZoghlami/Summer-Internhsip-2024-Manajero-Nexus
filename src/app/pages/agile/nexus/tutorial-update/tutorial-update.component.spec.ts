import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { TutorialUpdateComponent } from './tutorial-update.component';
import { TutorialService } from '../../../../core/services/nexus-services/tutorial.service';
import { Tutorial } from '../../../../core/models/nexus-models/tutorial.model';

describe('TutorialUpdateComponent', () => {
  let component: TutorialUpdateComponent;
  let fixture: ComponentFixture<TutorialUpdateComponent>;
  let tutorialServiceSpy: jasmine.SpyObj<TutorialService>;
  let toastrServiceSpy: jasmine.SpyObj<NbToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const tutorialServiceSpyObj = jasmine.createSpyObj('TutorialService', ['getTutorialById', 'updateTutorial']);
    const toastrServiceSpyObj = jasmine.createSpyObj('NbToastrService', ['success', 'danger']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => '1'
      } as ParamMap)
    };

    await TestBed.configureTestingModule({
      declarations: [TutorialUpdateComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: TutorialService, useValue: tutorialServiceSpyObj },
        { provide: NbToastrService, useValue: toastrServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialUpdateComponent);
    component = fixture.componentInstance;
    tutorialServiceSpy = TestBed.inject(TutorialService) as jasmine.SpyObj<TutorialService>;
    toastrServiceSpy = TestBed.inject(NbToastrService) as jasmine.SpyObj<NbToastrService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tutorialForm).toBeDefined();
  });

  it('should load tutorial on ngOnInit', () => {
    const mockTutorial = {
      introduction: 'Intro',
      whyUse: 'Why Use',
      whatIsNexus: 'What is Nexus',
      howDoesItWork: 'How Does It Work',
      limitations: 'Limitations',
      applyingNexus: 'Applying Nexus',
      conclusion: 'Conclusion',
      roleImageUrl: '/path/to/roleImage.jpg',
      processImageUrl: '/path/to/processImage.jpg'
    } as Tutorial;

    tutorialServiceSpy.getTutorialById.and.returnValue(of(mockTutorial));

    component.ngOnInit();
    expect(tutorialServiceSpy.getTutorialById).toHaveBeenCalledWith('1');
    expect(component.tutorialForm.value.introduction).toBe(mockTutorial.introduction);
    expect(component.roleImagePreview).toBe('http://localhost:8085/ManajeroBackend/path/to/roleImage.jpg');
  });

  it('should handle error when loading tutorial', () => {
    tutorialServiceSpy.getTutorialById.and.returnValue(throwError('Error loading tutorial'));

    component.ngOnInit();
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to load tutorial: Error loading tutorial', 'Error');
  });

  it('should show error message if form is invalid on updateTutorial', () => {
    component.updateTutorial();
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Please fill in all required fields.', 'Error');
  });

  it('should update tutorial successfully', () => {
    component.ngOnInit();
    component.tutorialForm.patchValue({
      introduction: 'Intro',
      whyUse: 'Why Use',
      whatIsNexus: 'What is Nexus',
      howDoesItWork: 'How Does It Work',
      limitations: 'Limitations',
      applyingNexus: 'Applying Nexus',
      conclusion: 'Conclusion',
      roleImageUrl: '',
      processImageUrl: ''
    });

    tutorialServiceSpy.updateTutorial.and.returnValue(of({} as Tutorial));

    component.updateTutorial();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Tutorial updated successfully!', 'Success');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/nexus']);
  });

  it('should handle error when updating tutorial', () => {
    component.ngOnInit();
    component.tutorialForm.patchValue({
      introduction: 'Intro',
      whyUse: 'Why Use',
      whatIsNexus: 'What is Nexus',
      howDoesItWork: 'How Does It Work',
      limitations: 'Limitations',
      applyingNexus: 'Applying Nexus',
      conclusion: 'Conclusion',
      roleImageUrl: '',
      processImageUrl: ''
    });

    tutorialServiceSpy.updateTutorial.and.returnValue(throwError('Error updating tutorial'));

    component.updateTutorial();
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to update tutorial.', 'Error');
  });

  it('should set role image preview on file select', () => {
    const file = new File([''], 'roleImage.jpg');
    const event = { target: { files: [file] } };

    spyOn(window, 'FileReader').and.callFake(() => {
      return {
        readAsDataURL: () => {},
        onload: (e: any) => {
          component.roleImagePreview = 'data:image/jpeg;base64,';
        }
      } as any;
    });

    component.onRoleImageSelected(event as any);
    expect(component.selectedRoleImage).toBe(file);
    expect(component.roleImagePreview).toBe('data:image/jpeg;base64,');
  });

  it('should set process image preview on file select', () => {
    const file = new File([''], 'processImage.jpg');
    const event = { target: { files: [file] } };

    spyOn(window, 'FileReader').and.callFake(() => {
      return {
        readAsDataURL: () => {},
        onload: (e: any) => {
          component.processImagePreview = 'data:image/jpeg;base64,';
        }
      } as any;
    });

    component.onProcessImageSelected(event as any);
    expect(component.selectedProcessImage).toBe(file);
    expect(component.processImagePreview).toBe('data:image/jpeg;base64,');
  });
});