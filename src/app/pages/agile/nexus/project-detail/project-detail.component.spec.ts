import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProjectDetailComponent } from './project-detail.component';
import { NexusProject, Sprint, TeamMember } from '../../../../core/models/nexus-models/nexus-proejct-model';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDetailComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when onClose is called', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should display project name and description if project is provided', () => {
    const project: NexusProject = {
      projectName: 'Test Project',
      description: 'Test description',
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: [],
      id: '',
      startDate: '',
      endDate: ''
    };
    component.project = project;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Project');
    expect(compiled.querySelector('.description')?.textContent).toContain('Test description');
  });

  it('should display default messages when project data is missing', () => {
    component.project = null;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Project Details');
    expect(compiled.querySelector('.description')?.textContent).toContain('No description available');
  });

  it('should correctly format and display product backlog items', () => {
    const project: NexusProject = {
      projectName: 'Test Project',
      description: 'Test description',
      productBacklog: [
        { title: 'Backlog Item 1', priority: 'high', status: 'pending' },
        { title: 'Backlog Item 2', priority: 'medium', status: 'completed' }
      ],
      sprints: [],
      teams: [],
      goals: [],
      id: '',
      startDate: '',
      endDate: ''
    };
    component.project = project;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.backlog-item').length).toBe(2);
    expect(compiled.querySelector('.backlog-item')?.textContent).toContain('Backlog Item 1');
  });

  it('should display "No items in product backlog" if there are no backlog items', () => {
    const project: NexusProject = {
      projectName: 'Test Project',
      description: 'Test description',
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: [],
      id: '',
      startDate: '',
      endDate: ''
    };
    component.project = project;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('No items in product backlog.');
  });

  it('should display sprint details correctly', () => {
    const project: NexusProject = {
      projectName: 'Test Project',
      description: 'Test description',
      productBacklog: [],

      teams: [],
      goals: [],
      id: '',
      startDate: '',
      endDate: '',
      sprints: []
    };
    component.project = project;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sprint-item')?.textContent).toContain('Sprint 1');
    expect(compiled.querySelector('.sprint-item')?.textContent).toContain('Start: 1 Jan 2024');
    expect(compiled.querySelector('.sprint-item')?.textContent).toContain('End: 15 Jan 2024');
  });

  it('should display formatted team members correctly', () => {
    const project: NexusProject = {
      projectName: 'Test Project',
      description: 'Test description',
      productBacklog: [],
      sprints: [],
      teams: [
        {
          name: 'Team A',
          members: [{
            name: 'Alice',
            id: '',
            role: ''
          }, {
            name: 'Bob',
            id: '',
            role: ''
          }],
          id: ''
        }
      ],
      goals: [],
      id: '',
      startDate: '',
      endDate: ''
    };
    component.project = project;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.team-item')?.textContent).toContain('Team A');
    expect(compiled.querySelector('.team-item')?.textContent).toContain('Alice, Bob');
  });

  it('should handle empty teams and goals gracefully', () => {
    const project: NexusProject = {
      projectName: 'Test Project',
      description: 'Test description',
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: [],
      id: '',
      startDate: '',
      endDate: ''
    };
    component.project = project;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('No teams available.');
    expect(compiled.querySelector('p')?.textContent).toContain('No goals available.');
  });
});
