import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NexusDashboardComponent } from './nexus-dashboard.component';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NexusProject } from '../../../../../models/nexus-proejct-model';

describe('NexusDashboardComponent', () => {
  let component: NexusDashboardComponent;
  let fixture: ComponentFixture<NexusDashboardComponent>;
  let nexusProjectService: jasmine.SpyObj<NexusProjectService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const nexusProjectServiceSpy = jasmine.createSpyObj('NexusProjectService', ['getAllProjects', 'getProjectKpis', 'getPerformanceData', 'getEfficiencyData']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ NexusDashboardComponent ],
      providers: [
        { provide: NexusProjectService, useValue: nexusProjectServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexusDashboardComponent);
    component = fixture.componentInstance;
    nexusProjectService = TestBed.inject(NexusProjectService) as jasmine.SpyObj<NexusProjectService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on init', () => {
    const mockProjects = [{ projectName: 'Project 1' }];
    nexusProjectService.getAllProjects.and.returnValue(of(mockProjects as NexusProject[]));

    component.ngOnInit();

    expect(component.projects).toEqual(mockProjects);
    expect(nexusProjectService.getAllProjects).toHaveBeenCalled();
  });

  it('should handle error when loading projects', () => {
    const consoleSpy = spyOn(console, 'error');
    nexusProjectService.getAllProjects.and.returnValue(throwError('Error'));

    component.loadProjects();

    expect(consoleSpy).toHaveBeenCalledWith('Error loading projects', 'Error');
  });

  it('should load KPIs and update charts on init', () => {
    const mockKpis = { totalProjects: 5, goalsCount: { goal1: 10 } };
    nexusProjectService.getProjectKpis.and.returnValue(of(mockKpis));

    component.ngOnInit();

    expect(component.kpis).toEqual(mockKpis);
    expect(component.goalsChartOption.series[0].data).toEqual([10]);
    expect(nexusProjectService.getProjectKpis).toHaveBeenCalled();
  });

  it('should handle error when loading KPIs', () => {
    const consoleSpy = spyOn(console, 'error');
    nexusProjectService.getProjectKpis.and.returnValue(throwError('Error'));

    component.loadKpis();

    expect(consoleSpy).toHaveBeenCalledWith('Error loading KPIs', 'Error');
  });

  it('should navigate to projects', () => {
    component.navigateToProjects();

    expect(router.navigate).toHaveBeenCalledWith(['pages/agile/nexus/project']);
  });
});