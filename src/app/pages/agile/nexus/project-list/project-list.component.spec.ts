import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectListComponent } from './project-list.component';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { NexusProject } from '../../../../core/models/nexus-models/nexus-proejct-model';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectServiceSpy: jasmine.SpyObj<NexusProjectService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('NexusProjectService', ['getAllProjects']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProjectListComponent],
      providers: [
        { provide: NexusProjectService, useValue: projectServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on init', () => {
    const projects: NexusProject[] = [
      { id: '1', projectName: 'Project 1', description: 'Description 1', startDate: new Date().toISOString(), endDate: new Date().toISOString(), productBacklog: [], sprints: [], teams: [], goals: [] }
    ];
    projectServiceSpy.getAllProjects.and.returnValue(of(projects));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.projects).toEqual(projects);
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle error when loading projects', () => {
    projectServiceSpy.getAllProjects.and.returnValue(throwError(() => new Error('Error loading projects')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.projects).toEqual([]);
    expect(component.isLoading).toBeFalsy();
  });

  it('should navigate to project settings', () => {
    const project: NexusProject = { id: '1', projectName: 'Project 1', description: 'Description 1', startDate: new Date().toISOString(), endDate: new Date().toISOString(), productBacklog: [], sprints: [], teams: [], goals: [] };
    component.openSettings(project);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/project-settings/1']);
  });

  it('should navigate to new project creation page', () => {
    component.createNewProject();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/project/create']);
  });

  it('should navigate to dashboard', () => {
    component.goToDashboard();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pages/agile/nexus/dashboard']);
  });

  it('should select project on viewProjectDetails', () => {
    const project: NexusProject = { id: '1', projectName: 'Project 1', description: 'Description 1', startDate: new Date().toISOString(), endDate: new Date().toISOString(), productBacklog: [], sprints: [], teams: [], goals: [] };
    component.viewProjectDetails(project);
    fixture.detectChanges();

    expect(component.selectedProject).toEqual(project);
  });

  it('should close project details on closeDetails', () => {
    component.closeDetails();
    fixture.detectChanges();

    expect(component.selectedProject).toBeUndefined();
  });
});
