import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { NexusProjectCreateComponent } from './nexus-project-create.component';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';

// Create mock services
class MockNexusProjectService {
  createProject = jasmine.createSpy('createProject').and.returnValue(of({}));
}

class MockNbToastrService {
  success = jasmine.createSpy('success');
  danger = jasmine.createSpy('danger');
  warning = jasmine.createSpy('warning');
}

describe('NexusProjectCreateComponent', () => {
  let component: NexusProjectCreateComponent;
  let fixture: ComponentFixture<NexusProjectCreateComponent>;
  let mockNexusProjectService: MockNexusProjectService;
  let mockNbToastrService: MockNbToastrService;
  let router: Router;

  beforeEach(async () => {
    mockNexusProjectService = new MockNexusProjectService();
    mockNbToastrService = new MockNbToastrService();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NexusProjectCreateComponent, NbStepperComponent],
      providers: [
        FormBuilder,
        { provide: NexusProjectService, useValue: mockNexusProjectService },
        { provide: NbToastrService, useValue: mockNbToastrService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NexusProjectCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.projectForm).toBeDefined();
    expect(component.projectForm.get('projectName').value).toBe('');
    expect(component.projectForm.get('description').value).toBe('');
    expect(component.projectForm.get('startDate').value).toBe('');
    expect(component.projectForm.get('endDate').value).toBe('');
    expect(component.productBacklog.length).toBe(1);
    expect(component.sprints.length).toBe(1);
    expect(component.teams.length).toBe(1);
    expect(component.goals.length).toBe(1);
  });

  it('should call createProject and show success message on successful response', () => {
    component.projectForm.setValue({
      projectName: 'Test Project',
      description: 'Test Description',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      productBacklog: [{ title: 'Backlog Item', description: 'Description', priority: 'High', status: 'In Progress' }],
      sprints: [{ number: 1, startDate: '2024-01-01', endDate: '2024-01-14', reviews: [], completed: false }],
      teams: [{ id: '1', name: 'Team A', description: 'Description', members: [], roles: [] }],
      goals: [{ content: 'Goal 1' }]
    });

    component.onSubmit();
    
    expect(mockNexusProjectService.createProject).toHaveBeenCalledWith(component.projectForm.value);
    expect(mockNbToastrService.success).toHaveBeenCalledWith('Project created successfully!', 'Success');
    expect(router.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/project']);
  });

  it('should show error message on failed response', () => {
    mockNexusProjectService.createProject.and.returnValue(throwError(() => new Error('Error')));
    
    component.projectForm.setValue({
      projectName: 'Test Project',
      description: 'Test Description',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      productBacklog: [{ title: 'Backlog Item', description: 'Description', priority: 'High', status: 'In Progress' }],
      sprints: [{ number: 1, startDate: '2024-01-01', endDate: '2024-01-14', reviews: [], completed: false }],
      teams: [{ id: '1', name: 'Team A', description: 'Description', members: [], roles: [] }],
      goals: [{ content: 'Goal 1' }]
    });

    component.onSubmit();

    expect(mockNbToastrService.danger).toHaveBeenCalledWith('Failed to create project. Please try again.', 'Error');
  });

  it('should show validation warning and not proceed if form is invalid', () => {
    component.projectForm.setValue({
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      productBacklog: [{ title: '', description: '', priority: '', status: '' }],
      sprints: [{ number: '', startDate: '', endDate: '', reviews: [], completed: false }],
      teams: [{ id: '', name: '', description: '', members: [], roles: [] }],
      goals: [{ content: '' }]
    });

    component.nextStep();

    expect(mockNbToastrService.warning).toHaveBeenCalledWith('Please correct the errors before proceeding.', 'Validation Error');
  });

  it('should navigate to projects on navigateToProjects call', () => {
    component.navigateToProjects();
    expect(router.navigate).toHaveBeenCalledWith(['pages/agile/nexus/project']);
  });
});
