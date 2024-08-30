import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProjectSettingsComponent } from './project-settings.component';

describe('ProjectSettingsComponent', () => {
  let component: ProjectSettingsComponent;
  let fixture: ComponentFixture<ProjectSettingsComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSettingsComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '123' // Mock project ID
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize projectId from route', () => {
    expect(component.projectId).toBe('123');
  });

  it('should return correct project overview link', () => {
    const expectedLink = '/pages/agile/project-settings/123/project-overview';
    expect(component.getProjectOverviewLink()).toBe(expectedLink);
  });

  it('should return correct product backlog link', () => {
    const expectedLink = '/pages/agile/project-settings/123/nexus-product-backlog';
    expect(component.getProductBacklogLink()).toBe(expectedLink);
  });

  it('should return correct sprints list link', () => {
    const expectedLink = '/pages/agile/project-settings/123/sprint-list';
    expect(component.getSprintsListLink()).toBe(expectedLink);
  });

  it('should return correct nexus goals link', () => {
    const expectedLink = '/pages/agile/project-settings/123/nexus-goals';
    expect(component.getNexusGoalsLink()).toBe(expectedLink);
  });

  it('should navigate to projects', () => {
    spyOn(router, 'navigate');
    component.navigateToProjects();
    expect(router.navigate).toHaveBeenCalledWith(['pages/agile/nexus/project']);
  });
});
