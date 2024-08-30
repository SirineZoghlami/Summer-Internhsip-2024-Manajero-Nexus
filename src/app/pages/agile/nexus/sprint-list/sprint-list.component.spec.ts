import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subscription, throwError } from 'rxjs';
import { SprintListComponent } from './sprint-list.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { ReviewModalComponent } from '../review-modal/review-modal.component';
import { SprintModalComponent } from '../sprint-modal/sprint-modal.component';
import { ConfirmationDialogComponent } from '../../../agile/nexus/confirmation-dialog/confirmation-dialog.component';
import { Sprint, NexusProject } from '../../../../core/models/nexus-models/nexus-proejct-model';

describe('SprintListComponent', () => {
  let component: SprintListComponent;
  let fixture: ComponentFixture<SprintListComponent>;
  let dialogService: jasmine.SpyObj<NbDialogService>;
  let toastrService: jasmine.SpyObj<NbToastrService>;
  let projectService: jasmine.SpyObj<NexusProjectService>;

  beforeEach(async () => {
    const dialogServiceSpy = jasmine.createSpyObj('NbDialogService', ['open']);
    const toastrServiceSpy = jasmine.createSpyObj('NbToastrService', ['success', 'danger']);
    const projectServiceSpy = jasmine.createSpyObj('NexusProjectService', [
      'getProjectById',
      'getSprintsByProjectId',
      'deleteSprint',
      'updateProject',
      'markSprintAsCompleted',
      'updateProjectStatusIfCompleted'
    ]);

    await TestBed.configureTestingModule({
      declarations: [SprintListComponent],
      providers: [
        { provide: NbDialogService, useValue: dialogServiceSpy },
        { provide: NbToastrService, useValue: toastrServiceSpy },
        { provide: NexusProjectService, useValue: projectServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SprintListComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(NbDialogService) as jasmine.SpyObj<NbDialogService>;
    toastrService = TestBed.inject(NbToastrService) as jasmine.SpyObj<NbToastrService>;
    projectService = TestBed.inject(NexusProjectService) as jasmine.SpyObj<NexusProjectService>;

    // Mock route parameters
    spyOn(component['route'].parent!.paramMap, 'subscribe').and.callFake((callback: any) => {
      callback({ get: (key: string) => '123' }); // Mock project ID
      return new Subscription(); // Return a proper Subscription object
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sprints and project details on initialization', () => {
    const mockSprints: Sprint[] = [{ number: 1, startDate: new Date().toISOString(), endDate: new Date().toISOString(), reviews: [], completed: false }];
    const mockProject: NexusProject = {
      projectName: 'Test Project', sprints: mockSprints,
      id: '',
      description: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      productBacklog: [],
      teams: [],
      goals: []
    };

    projectService.getSprintsByProjectId.and.returnValue(of(mockSprints));
    projectService.getProjectById.and.returnValue(of(mockProject));

    component.ngOnInit();

    expect(component.sprints).toEqual(mockSprints);
    expect(component.projectName).toBe('Test Project');
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle errors when loading sprints', () => {
    projectService.getSprintsByProjectId.and.returnValue(throwError('Error loading sprints'));
    component.loadSprints();
    expect(component.isLoading).toBeFalsy();
  });

  it('should open confirmation dialog and delete sprint on confirmation', () => {
    const mockSprintNumber = 1;
    dialogService.open.and.returnValue({ onClose: of(true) } as any);
    projectService.deleteSprint.and.returnValue(of(null));
    component.confirmDelete(mockSprintNumber);
    expect(dialogService.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this sprint?'
      }
    });
    expect(projectService.deleteSprint).toHaveBeenCalledWith(component.projectId, mockSprintNumber);
  });

  it('should handle deletion failure', () => {
    const mockSprintNumber = 1;
    dialogService.open.and.returnValue({ onClose: of(true) } as any);
    projectService.deleteSprint.and.returnValue(throwError('Error deleting sprint'));
    component.confirmDelete(mockSprintNumber);
    expect(toastrService.danger).toHaveBeenCalledWith('Failed to delete sprint');
  });

  it('should open review modal and add review to sprint', () => {
    const mockSprint: Sprint = { number: 1, startDate: new Date().toISOString(), endDate: new Date().toISOString(), reviews: [], completed: false };
    const review = { reviewDate: new Date().toISOString(), reviewContent: 'Great Sprint!' };
    dialogService.open.and.returnValue({ onClose: of(review) } as any);
    projectService.getProjectById.and.returnValue(of({
      id: 'mock-id',
      projectName: 'Mock Project',
      description: 'Mock Description',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      productBacklog: [],
      sprints: [mockSprint],
      teams: [],
      goals: []
    }));
    projectService.updateProject.and.returnValue(of(null));
    component.openReviewModal(mockSprint);
    expect(dialogService.open).toHaveBeenCalledWith(ReviewModalComponent);
    expect(projectService.updateProject).toHaveBeenCalled();
    expect(component.sprints[0].reviews).toContain(review);
  });

  it('should handle adding review failure', () => {
    const mockSprint: Sprint = { number: 1, startDate: new Date().toISOString(), endDate: new Date().toISOString(), reviews: [], completed: false };
    dialogService.open.and.returnValue({ onClose: of({ reviewDate: new Date().toISOString(), reviewContent: 'Great Sprint!' }) } as any);
    projectService.getProjectById.and.returnValue(throwError('Error fetching project'));
    component.openReviewModal(mockSprint);
    expect(toastrService.danger).toHaveBeenCalledWith('Failed to add review');
  });

  it('should mark sprint as completed and update project status if all sprints are completed', () => {
    const mockSprint: Sprint = { number: 1, startDate: new Date().toISOString(), endDate: new Date().toDateString(), reviews: [], completed: false };
    component.sprints = [mockSprint];
    projectService.markSprintAsCompleted.and.returnValue(of(null));
    projectService.updateProjectStatusIfCompleted.and.returnValue(of(null));
    component.markAsCompleted(mockSprint);
    expect(projectService.markSprintAsCompleted).toHaveBeenCalledWith(component.projectId, mockSprint.number);
    expect(projectService.updateProjectStatusIfCompleted).toHaveBeenCalledWith(component.projectId);
  });

  it('should handle mark as completed failure', () => {
    const mockSprint: Sprint = { number: 1, startDate: new Date().toISOString(), endDate: new Date().toISOString(), reviews: [], completed: false };
    component.sprints = [mockSprint];
    projectService.markSprintAsCompleted.and.returnValue(throwError('Error marking sprint as completed'));
    component.markAsCompleted(mockSprint);
    expect(toastrService.danger).toHaveBeenCalledWith('Failed to mark sprint as completed');
  });

  it('should open sprint modal and add new sprint', () => {
    const newSprint: Sprint = { number: 2, startDate: new Date().toISOString(), endDate: new Date().toISOString(), reviews: [], completed: false };
    dialogService.open.and.returnValue({ onClose: of(newSprint) } as any);
    projectService.getProjectById.and.returnValue(of({
      id: 'mock-id',
      projectName: 'Mock Project',
      description: 'Mock Description',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: []
    }));
    projectService.updateProject.and.returnValue(of(null));
    component.openSprintModal();
    expect(dialogService.open).toHaveBeenCalledWith(SprintModalComponent);
    expect(projectService.updateProject).toHaveBeenCalledWith(component.projectId, { sprints: [newSprint] });
  });

  it('should handle adding new sprint failure', () => {
    const newSprint: Sprint = { number: 2, startDate: new Date().toISOString(), endDate: new Date().toISOString(), reviews: [], completed: false };
    dialogService.open.and.returnValue({ onClose: of(newSprint) } as any);
    projectService.getProjectById.and.returnValue(throwError('Error fetching project'));
    component.openSprintModal();
    expect(toastrService.danger).toHaveBeenCalledWith('Failed to add new sprint');
  });
});