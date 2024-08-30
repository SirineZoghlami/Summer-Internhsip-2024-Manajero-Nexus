import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexusGoalListComponent } from './nexus-goal-list.component';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { of, throwError } from 'rxjs';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { NexusGoal } from '../../../../core/models/nexus-models/nexus-proejct-model';
import { GoalModalComponent } from '../goal-modal/goal-modal.component'; // Adjust the path accordingly

describe('NexusGoalListComponent', () => {
  let component: NexusGoalListComponent;
  let fixture: ComponentFixture<NexusGoalListComponent>;
  let projectServiceSpy: jasmine.SpyObj<NexusProjectService>;
  let dialogServiceSpy: jasmine.SpyObj<NbDialogService>;
  const mockRoute = {
    parent: {
      paramMap: of({ get: (key: string) => '123' }), // Mock project ID
    },
  };

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('NexusProjectService', ['getProjectById', 'getGoalsByProjectId', 'updateProject', 'deleteGoal']);
    dialogServiceSpy = jasmine.createSpyObj('NbDialogService', ['open']);

    await TestBed.configureTestingModule({
      declarations: [NexusGoalListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: NexusProjectService, useValue: projectServiceSpy },
        { provide: NbDialogService, useValue: dialogServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NexusGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load project details on initialization', () => {
    const mockProject = { projectName: 'Test Project', goals: [] } as any;
    projectServiceSpy.getProjectById.and.returnValue(of(mockProject));

    component.loadProjectDetails();

    expect(projectServiceSpy.getProjectById).toHaveBeenCalledWith('123');
    expect(component.projectName).toBe('Test Project');
  });

  it('should load goals on initialization', () => {
    const mockGoals: NexusGoal[] = [{ id: '1', content: 'Test Goal' }];
    projectServiceSpy.getGoalsByProjectId.and.returnValue(of(mockGoals));

    component.loadGoals();

    expect(projectServiceSpy.getGoalsByProjectId).toHaveBeenCalledWith('123');
    expect(component.goals).toEqual(mockGoals);
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle error when loading goals fails', () => {
    projectServiceSpy.getGoalsByProjectId.and.returnValue(throwError('Error loading goals'));

    component.loadGoals();

    expect(component.isLoading).toBeFalsy();
  });

  it('should open goal modal and add a new goal', () => {
    const newGoal: NexusGoal = { id: '2', content: 'New Goal' };
    dialogServiceSpy.open.and.returnValue({ onClose: of(newGoal) } as any);
    spyOn(component, 'addGoalToProject');

    component.openGoalModal();

    expect(dialogServiceSpy.open).toHaveBeenCalledWith(GoalModalComponent);
    expect(component.addGoalToProject).toHaveBeenCalledWith(newGoal);
  });

  it('should add a new goal to the project', () => {
    const newGoal: NexusGoal = { id: '3', content: 'Newly Added Goal' };
    const mockProject = { projectName: 'Test Project', goals: [] } as any;
    projectServiceSpy.getProjectById.and.returnValue(of(mockProject));

    component.addGoalToProject(newGoal);

    expect(projectServiceSpy.getProjectById).toHaveBeenCalledWith('123');
    expect(projectServiceSpy.updateProject).toHaveBeenCalled();
  });

  it('should delete a goal', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Mock confirm dialog
    const mockGoals: NexusGoal[] = [{ id: '1', content: 'Goal 1' }];
    component.goals = mockGoals;

    component.deleteGoal('1');

    expect(projectServiceSpy.deleteGoal).toHaveBeenCalledWith('123', '1');
    expect(component.goals.length).toBe(0);
  });

  it('should not delete a goal if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false); // Mock confirm dialog

    component.deleteGoal('1');

    expect(projectServiceSpy.deleteGoal).not.toHaveBeenCalled();
  });
});
