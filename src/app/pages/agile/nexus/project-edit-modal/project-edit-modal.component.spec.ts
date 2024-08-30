import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { NbDialogRef, NbButtonModule } from '@nebular/theme';
import { ProjectEditModalComponent } from './project-edit-modal.component';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { NexusProject } from '../../../../core/models/nexus-models/nexus-proejct-model';

describe('ProjectEditModalComponent', () => {
  let component: ProjectEditModalComponent;
  let fixture: ComponentFixture<ProjectEditModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<NbDialogRef<ProjectEditModalComponent>>;
  let projectServiceSpy: jasmine.SpyObj<NexusProjectService>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('NbDialogRef', ['close']);
    projectServiceSpy = jasmine.createSpyObj('NexusProjectService', ['updateProject']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NbButtonModule],
      declarations: [ProjectEditModalComponent],
      providers: [
        FormBuilder,
        { provide: NbDialogRef, useValue: dialogRefSpy },
        { provide: NexusProjectService, useValue: projectServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.editForm.contains('projectName')).toBeTruthy();
    expect(component.editForm.contains('description')).toBeTruthy();
    expect(component.editForm.contains('startDate')).toBeTruthy();
    expect(component.editForm.contains('endDate')).toBeTruthy();
  });

  it('should set project data into the form', () => {
    const project: NexusProject = {
      id: '1',
      projectName: 'Test Project',
      description: 'Test description',
      startDate: new Date('2024-01-01').toISOString(),
      endDate: new Date('2024-12-31').toISOString(),
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: []
    };
    component.setProjectData(project);
    fixture.detectChanges();

    expect(component.editForm.get('projectName')?.value).toBe('Test Project');
    expect(component.editForm.get('description')?.value).toBe('Test description');
    expect(component.editForm.get('startDate')?.value).toBe('2024-01-01');
    expect(component.editForm.get('endDate')?.value).toBe('2024-12-31');
  });

  it('should call projectService.updateProject and close the dialog on successful save', () => {
    const project: NexusProject = {
      id: '1',
      projectName: 'Test Project',
      description: 'Test description',
      startDate: new Date('2024-01-01').toISOString(),
      endDate: new Date('2024-12-31').toISOString(),
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: []
    };
    component.setProjectData(project);
    fixture.detectChanges();

    component.saveChanges();

    expect(projectServiceSpy.updateProject).toHaveBeenCalledWith(project.id, {
      ...project,
      ...component.editForm.value
    });
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should handle error when updating project fails', () => {
    const project: NexusProject = {
      id: '1',
      projectName: 'Test Project',
      description: 'Test description',
      startDate: new Date('2024-01-01').toISOString(),
      endDate: new Date('2024-12-31').toISOString(),
      productBacklog: [],
      sprints: [],
      teams: [],
      goals: []
    };
    component.setProjectData(project);
    fixture.detectChanges();

    projectServiceSpy.updateProject.and.returnValue(throwError(() => new Error('Update failed')));
    spyOn(console, 'error');
    component.saveChanges();

    expect(console.error).toHaveBeenCalledWith('Error updating project', jasmine.any(Error));
  });

  it('should close the dialog on cancel', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should disable submit button if form is invalid', () => {
    component.editForm.get('projectName')?.setValue('');
    component.editForm.get('description')?.setValue('');
    fixture.detectChanges();
    
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
  });
});
