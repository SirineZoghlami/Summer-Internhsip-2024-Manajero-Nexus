import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { TutorialCreateComponent } from './tutorial-create.component';
import { TutorialService } from '../../../../core/services/nexus-services/tutorial.service';

describe('TutorialCreateComponent', () => {
  let component: TutorialCreateComponent;
  let fixture: ComponentFixture<TutorialCreateComponent>;
  let tutorialServiceSpy: jasmine.SpyObj<TutorialService>;
  let toastrServiceSpy: jasmine.SpyObj<NbToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const tutorialServiceSpyObj = jasmine.createSpyObj('TutorialService', ['createTutorial', 'uploadImage']);
    const toastrServiceSpyObj = jasmine.createSpyObj('NbToastrService', ['success', 'danger']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TutorialCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: TutorialService, useValue: tutorialServiceSpyObj },
        { provide: NbToastrService, useValue: toastrServiceSpyObj },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialCreateComponent);
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

  it('should show error message if form is invalid on createTutorial', () => {
    component.createTutorial();
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Please fill in all required fields.', 'Error');
  });

  it('should create tutorial successfully', () => {
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

    const mockResponse = {
      id: '1',
      introduction: 'Intro',
      whyUse: 'Why Use',
      whatIsNexus: 'What is Nexus',
      howDoesItWork: 'How Does It Work',
      limitations: 'Limitations',
      applyingNexus: 'Applying Nexus',
      conclusion: 'Conclusion',
      roleImageUrl: '',
      processImageUrl: ''
    };
    tutorialServiceSpy.createTutorial.and.returnValue(of(mockResponse));

    component.createTutorial();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Tutorial created successfully!', 'Success');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/nexus']);
  });

  it('should handle error when creating tutorial', () => {
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

    tutorialServiceSpy.createTutorial.and.returnValue(throwError('Error creating tutorial'));

    component.createTutorial();
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to create tutorial.', 'Error');
  });

  it('should upload role image successfully', () => {
    const mockImageUrl = 'http://example.com/roleImage.jpg';
    tutorialServiceSpy.uploadImage.and.returnValue(of(mockImageUrl));

    component.selectedRoleImage = new File([''], 'roleImage.jpg');
    component.uploadRoleImage('1');

    expect(tutorialServiceSpy.uploadImage).toHaveBeenCalled();
    expect(component.tutorialForm.value.roleImageUrl).toBe(mockImageUrl);
  });

  it('should handle error when uploading role image', () => {
    tutorialServiceSpy.uploadImage.and.returnValue(throwError('Error uploading role image'));

    component.selectedRoleImage = new File([''], 'roleImage.jpg');
    component.uploadRoleImage('1');

    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to upload role image: Error uploading role image', 'Error');
  });

  it('should upload process image successfully', () => {
    const mockImageUrl = 'http://example.com/processImage.jpg';
    tutorialServiceSpy.uploadImage.and.returnValue(of(mockImageUrl));

    component.selectedProcessImage = new File([''], 'processImage.jpg');
    component.uploadProcessImage('1');

    expect(tutorialServiceSpy.uploadImage).toHaveBeenCalled();
    expect(component.tutorialForm.value.processImageUrl).toBe(mockImageUrl);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Tutorial created successfully!', 'Success');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/tutorial']);
  });

  it('should handle error when uploading process image', () => {
    tutorialServiceSpy.uploadImage.and.returnValue(throwError('Error uploading process image'));

    component.selectedProcessImage = new File([''], 'processImage.jpg');
    component.uploadProcessImage('1');

    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to upload process image: Error uploading process image', 'Error');
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

    component.onRoleImageSelected(event);
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

    component.onProcessImageSelected(event);
    expect(component.selectedProcessImage).toBe(file);
    expect(component.processImagePreview).toBe('data:image/jpeg;base64,');
  });
});