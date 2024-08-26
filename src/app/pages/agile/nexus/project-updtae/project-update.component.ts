import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {
  projectForm: FormGroup;
  private projectId: string | null = null;

  // Dropdown options
  priorityOptions = ['High', 'Medium', 'Low'];
  statusOptions = ['To Do', 'In Progress', 'Done'];
  sprintOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private fb: FormBuilder,
    private projectService: NexusProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      if (this.projectId) {
        this.loadProject(this.projectId);
      }
    });
  }

  private initializeForm(): void {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productBacklog: this.fb.array([]),
      sprints: this.fb.array([]),
      teams: this.fb.array([]),
      goals: this.fb.array([])
    });
  }

  private loadProject(id: string): void {
    this.projectService.getProjectById(id).subscribe(project => {
      this.projectForm.patchValue(project);
      this.setProductBacklog(project.productBacklog);
      this.setSprints(project.sprints);
      this.setTeams(project.teams);
      this.setGoals(project.goals);
    });
  }

  private setProductBacklog(backlog: any[]): void {
    const backlogFGs = backlog.map(item => this.fb.group(item));
    this.projectForm.setControl('productBacklog', this.fb.array(backlogFGs));
  }

  private setSprints(sprints: any[]): void {
    const sprintsFGs = sprints.map(item => this.fb.group(item));
    this.projectForm.setControl('sprints', this.fb.array(sprintsFGs));
  }

  private setTeams(teams: any[]): void {
    const teamsFGs = teams.map(item => this.fb.group(item));
    this.projectForm.setControl('teams', this.fb.array(teamsFGs));
  }

  private setGoals(goals: any[]): void {
    const goalsFGs = goals.map(item => this.fb.group(item));
    this.projectForm.setControl('goals', this.fb.array(goalsFGs));
  }

  get productBacklogControls() {
    return (this.projectForm.get('productBacklog') as FormArray).controls;
  }

  get sprintsControls() {
    return (this.projectForm.get('sprints') as FormArray).controls;
  }

  get teamsControls() {
    return (this.projectForm.get('teams') as FormArray).controls;
  }

  get goalsControls() {
    return (this.projectForm.get('goals') as FormArray).controls;
  }

  addBacklogItem(): void {
    const backlogFormArray = this.projectForm.get('productBacklog') as FormArray;
    backlogFormArray.push(this.fb.group({
      title: [''],
      description: [''],
      priority: ['']
    }));
  }

  removeBacklogItem(index: number): void {
    const backlogFormArray = this.projectForm.get('productBacklog') as FormArray;
    backlogFormArray.removeAt(index);
  }

  addSprint(): void {
    const sprintsFormArray = this.projectForm.get('sprints') as FormArray;
    sprintsFormArray.push(this.fb.group({
      name: [''],
      startDate: [''],
      endDate: ['']
    }));
  }

  removeSprint(index: number): void {
    const sprintsFormArray = this.projectForm.get('sprints') as FormArray;
    sprintsFormArray.removeAt(index);
  }

  addTeam(): void {
    const teamsFormArray = this.projectForm.get('teams') as FormArray;
    teamsFormArray.push(this.fb.group({
      name: [''],
      members: this.fb.array([])
    }));
  }

  removeTeam(index: number): void {
    const teamsFormArray = this.projectForm.get('teams') as FormArray;
    teamsFormArray.removeAt(index);
  }

  addGoal(): void {
    const goalsFormArray = this.projectForm.get('goals') as FormArray;
    goalsFormArray.push(this.fb.group({
      description: ['']
    }));
  }

  removeGoal(index: number): void {
    const goalsFormArray = this.projectForm.get('goals') as FormArray;
    goalsFormArray.removeAt(index);
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      this.projectService.updateProject(this.projectId!, project).subscribe(() => {
        this.toastrService.success('Project updated successfully');
        this.router.navigate(['pages/agile/nexus/project']);
      });
    } else {
      this.toastrService.danger('Please fill out all required fields');
    }
  }

 
  
}
