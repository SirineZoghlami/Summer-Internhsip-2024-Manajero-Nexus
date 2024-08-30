import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NexusProjectService } from './nexus.project.service.service';
import { NexusProject, Sprint, NexusGoal, ProductBacklogItem } from '../../models/nexus-models/nexus-proejct-model';

describe('NexusProjectService', () => {
  let service: NexusProjectService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8085/ManajeroBackend/api/projects';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NexusProjectService]
    });
    service = TestBed.inject(NexusProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a project', () => {
    const mockProject: NexusProject = { /* mock project data */ } as NexusProject;

    service.createProject(mockProject).subscribe(project => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockProject);
  });

  it('should get a project by id', () => {
    const mockProject: NexusProject = { /* mock project data */ } as NexusProject;
    const projectId = '1';

    service.getProjectById(projectId).subscribe(project => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);
  });

  it('should update a project', () => {
    const mockProject: NexusProject = { /* mock project data */ } as NexusProject;
    const projectId = '1';

    service.updateProject(projectId, mockProject).subscribe(project => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProject);
  });

  it('should delete a project', () => {
    const projectId = '1';

    service.deleteProject(projectId).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get all projects', () => {
    const mockProjects: NexusProject[] = [{ /* mock project data */ }] as NexusProject[];

    service.getAllProjects().subscribe(projects => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  it('should get project KPIs', () => {
    const mockKpis = { /* mock KPI data */ };

    service.getProjectKpis().subscribe(kpis => {
      expect(kpis).toEqual(mockKpis);
    });

    const req = httpMock.expectOne(`${apiUrl}/kpis`);
    expect(req.request.method).toBe('GET');
    req.flush(mockKpis);
  });

  it('should get sprints by project id', () => {
    const mockSprints: Sprint[] = [{ /* mock sprint data */ }] as Sprint[];
    const projectId = '1';

    service.getSprintsByProjectId(projectId).subscribe(sprints => {
      expect(sprints).toEqual(mockSprints);
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}/sprints`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSprints);
  });

  it('should mark sprint as completed', () => {
    const projectId = '1';
    const sprintNumber = 1;

    service.markSprintAsCompleted(projectId, sprintNumber).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}/sprints/${sprintNumber}/complete`);
    expect(req.request.method).toBe('PATCH');
    req.flush(null);
  });

  it('should update project status if completed', () => {
    const projectId = '1';

    service.updateProjectStatusIfCompleted(projectId).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}/status`);
    expect(req.request.method).toBe('PATCH');
    req.flush(null);
  });

  it('should get goals by project id', () => {
    const mockGoals: NexusGoal[] = [{ /* mock goal data */ }] as NexusGoal[];
    const projectId = '1';

    service.getGoalsByProjectId(projectId).subscribe(goals => {
      expect(goals).toEqual(mockGoals);
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}/goals`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGoals);
  });

  it('should add a product backlog item', () => {
    const mockProject: NexusProject = { /* mock project data */ } as NexusProject;
    const projectId = '1';
    const backlogItem: ProductBacklogItem = { /* mock backlog item data */ } as ProductBacklogItem;

    service.addProductBacklogItem(projectId, backlogItem).subscribe(project => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}/backlog-items`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProject);
  });

  it('should delete a sprint', () => {
    const projectId = '1';
    const sprintNumber = 1;

    service.deleteSprint(projectId, sprintNumber).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${projectId}/sprints/${sprintNumber}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should delete a goal', () => {
    const projectId = '1';
    const goalId = '1';

    service.deleteGoal(projectId, goalId).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/projects/${projectId}/goals/${goalId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get performance data', () => {
    const mockPerformanceData = new Map<string, number>([['key', 1]]);

    service.getPerformanceData().subscribe(data => {
      expect(data).toEqual(mockPerformanceData);
    });

    const req = httpMock.expectOne(`${apiUrl}/performance`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPerformanceData);
  });

  it('should get efficiency data', () => {
    const mockEfficiencyData = new Map<string, number>([['key', 1]]);

    service.getEfficiencyData().subscribe(data => {
      expect(data).toEqual(mockEfficiencyData);
    });

    const req = httpMock.expectOne(`${apiUrl}/efficiency`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEfficiencyData);
  });
});