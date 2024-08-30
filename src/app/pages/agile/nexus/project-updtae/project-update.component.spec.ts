import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProjectUpdateComponent } from './project-update.component';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

describe('ProjectUpdateComponent', () => {
  let component: ProjectUpdateComponent;
  let fixture: ComponentFixture<ProjectUpdateComponent>;
  let projectService: jasmine.SpyObj<NexusProjectService>;
  let toastrService: jasmine.SpyObj<NbToastrService>;
  let dialogService: jasmine.SpyObj<NbDialogService>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const projectServiceSpy = jasmine.createSpyObj('NexusProjectService', ['getProjectById', 'updateProject']);
    const toastrServiceSpy = jasmine.createSpyObj('NbToastrService', ['success', 'danger']);
    const dialogServiceSpy = jasmine.createSpyObj('NbDialogService', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ProjectUpdateComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        FormBuilder,
        { provide: NexusProjectService, useValue: projectServiceSpy },
        { provide: NbToastrService, useValue: toastrServiceSpy },
        { provide: NbDialogService, useValue: dialogServiceSpy },
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => '123' }) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUpdateComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(NexusProjectService) as jasmine.SpyObj<NexusProjectService>;
    toastrService = TestBed.inject(NbToastrService) as jasmine.SpyObj<NbToastrService>;
    dialogService = TestBed.inject(NbDialogService) as jasmine.SpyObj<NbDialogService>;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.projectForm).toBeDefined();
    expect(component.projectForm.controls['projectName']).toBeDefined();
  });

  it('should load project data on initialization', () => {
    const mockProject = {
      projectName: 'Test Project',
      description: 'Test Description',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: []
    };


    component.ngOnInit();

    expect(component.projectForm.value.projectName).toBe('Test Project');
  });

  it('should add a backlog item', () => {
    component.addBacklogItem();

    const backlogArray = component.projectForm.get('productBacklog') as FormArray;
    expect(backlogArray.length).toBe(1);
  });

  it('should remove a backlog item', () => {
    component.addBacklogItem(); // Add an item first
    component.removeBacklogItem(0);

    const backlogArray = component.projectForm.get('productBacklog') as FormArray;
    expect(backlogArray.length).toBe(0);
  });

  it('should save the project', () => {
    const mockProject = { projectName: 'Updated Project', description: 'Updated Description', startDate: '2024-01-01', endDate: '2024-12-31', productBacklog: [], sprints: [], teams: [], goals: [] };
    component.projectForm.setValue(mockProject);

    component.saveProject();

    expect(projectService.updateProject).toHaveBeenCalledWith('123', mockProject);
    expect(toastrService.success).toHaveBeenCalledWith('Project updated successfully');
    expect(router.navigate).toHaveBeenCalledWith(['pages/agile/nexus/project']);
  });

  it('should show a danger toast if form is invalid on save', () => {
    component.projectForm.controls['projectName'].setValue('');
    component.saveProject();

    expect(toastrService.danger).toHaveBeenCalledWith('Please fill out all required fields');
  });

  it('should call add/remove methods correctly', () => {
    component.addSprint();
    expect(component.sprintsControls.length).toBe(1);

    component.removeSprint(0);
    expect(component.sprintsControls.length).toBe(0);
  });
});
