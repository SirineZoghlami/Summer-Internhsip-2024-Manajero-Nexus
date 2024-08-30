import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProjectOverviewComponent } from './project-overview.component';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { NexusProject } from '../../../../core/models/nexus-models/nexus-proejct-model';
import { ProjectEditModalComponent } from '../project-edit-modal/project-edit-modal.component';
import { ConfirmationDialogComponent } from '../../../agile/nexus/confirmation-dialog/confirmation-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs';

describe('ProjectOverviewComponent', () => {
  let component: ProjectOverviewComponent;
  let fixture: ComponentFixture<ProjectOverviewComponent>;
  let projectServiceSpy: jasmine.SpyObj<NexusProjectService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogServiceSpy: jasmine.SpyObj<NbDialogService>;
  let toastrServiceSpy: jasmine.SpyObj<NbToastrService>;

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('NexusProjectService', ['getProjectById', 'deleteProject']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogServiceSpy = jasmine.createSpyObj('NbDialogService', ['open']);
    toastrServiceSpy = jasmine.createSpyObj('NbToastrService', ['success', 'danger']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProjectOverviewComponent],
      providers: [
        { provide: NexusProjectService, useValue: projectServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NbDialogService, useValue: dialogServiceSpy },
        { provide: NbToastrService, useValue: toastrServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              snapshot: {
                paramMap: {
                  get: () => 'test-project-id'
                }
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load project details on init', () => {
    const project: NexusProject = {
      id: '1',
      projectName: 'Project 1',
      description: 'Description 1',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: []
    };
    projectServiceSpy.getProjectById.and.returnValue(of(project));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.project).toEqual(project);
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle error when loading project details', () => {
    projectServiceSpy.getProjectById.and.returnValue(throwError(() => new Error('Error fetching project details')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
  });

  it('should calculate sprint stats correctly', () => {
    const project: NexusProject = {
      id: '1',
      projectName: 'Project 1',
      description: 'Description 1',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      productBacklog: [],
      sprints: [
        {
          completed: true, endDate: new Date().toISOString(),
          number: 0,
          startDate: ''
        },
        {
          completed: false, endDate: new Date(new Date().getTime() + 100000000).toISOString(),
          number: 0,
          startDate: ''
        }
      ],
      teams: [],
      goals: [],
    };
    component.project = project;
    component.calculateStats();

    expect(component.completedSprintsCount).toBe(1);
    expect(component.inProgressSprintsCount).toBe(1);
  });

  it('should navigate to projects list', () => {
    component.navigateToProjects();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['pages/agile/nexus/project']);
  });

  it('should open edit project modal and handle result', () => {
    const project: NexusProject = {
      id: '1',
      projectName: 'Project 1',
      description: 'Description 1',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: []
    };
    component.project = project;
    const dialogRef = { onClose: observableOf(true) };
    dialogServiceSpy.open.and.returnValue(dialogRef as any);

    component.editProject();
    fixture.detectChanges();

    expect(dialogServiceSpy.open).toHaveBeenCalledWith(ProjectEditModalComponent);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Project updated successfully!', 'Success', {
      status: 'success',
      destroyByClick: true
    });
  });

  it('should handle edit project modal failure', () => {
    const project: NexusProject = {
      id: '1',
      projectName: 'Project 1',
      description: 'Description 1',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: []
    };
    component.project = project;
    const dialogRef = { onClose: observableOf(false) };
    dialogServiceSpy.open.and.returnValue(dialogRef as any);

    component.editProject();
    fixture.detectChanges();

    expect(dialogServiceSpy.open).toHaveBeenCalledWith(ProjectEditModalComponent);
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to update project.', 'Error', {
      status: 'danger',
      destroyByClick: true
    });
  });

  it('should confirm and delete project', () => {
    const dialogRef = { onClose: observableOf(true) };
    dialogServiceSpy.open.and.returnValue(dialogRef as any);

    component.confirmDelete();
    fixture.detectChanges();

    expect(dialogServiceSpy.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this project?'
      }
    });
    expect(projectServiceSpy.deleteProject).toHaveBeenCalledWith('test-project-id');
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('Project deleted successfully');
  });

  it('should handle delete project error', () => {
    const dialogRef = { onClose: observableOf(true) };
    dialogServiceSpy.open.and.returnValue(dialogRef as any);
    projectServiceSpy.deleteProject.and.returnValue(throwError(() => new Error('Error deleting project')));

    component.confirmDelete();
    fixture.detectChanges();

    expect(dialogServiceSpy.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this project?'
      }
    });
    expect(projectServiceSpy.deleteProject).toHaveBeenCalledWith('test-project-id');
    expect(toastrServiceSpy.danger).toHaveBeenCalledWith('Failed to delete project');
  });
});
