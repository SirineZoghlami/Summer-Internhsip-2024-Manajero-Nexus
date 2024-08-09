import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { Router } from '@angular/router';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';
import { NexusProject } from '../../../../../models/nexus-proejct-model'; // Adjust the path accordingly

@Component({
  selector: 'app-nexus-project-create',
  templateUrl: './nexus-project-create.component.html',
  styleUrls: ['./nexus-project-create.component.scss']
})
export class NexusProjectCreateComponent implements OnInit {
  projectForm: FormGroup;
  priorities = ['High', 'Medium', 'Low'];
  sprintNumbers = Array.from({ length: 10 }, (_, i) => i + 1); // Numbers 1 to 10
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  constructor(
    private fb: FormBuilder,
    private nexusProjectService: NexusProjectService,
    private toastrService: NbToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productBacklog: this.fb.array([]),
      sprints: this.fb.array([]),
      teams: this.fb.array([]),
      goals: this.fb.array([]),
    });

    this.addProductBacklogItem();
    this.addSprint();
    this.addTeam();
    this.addGoal();
  }

  get productBacklog(): FormArray {
    return this.projectForm.get('productBacklog') as FormArray;
  }

  get sprints(): FormArray {
    return this.projectForm.get('sprints') as FormArray;
  }

  get teams(): FormArray {
    return this.projectForm.get('teams') as FormArray;
  }

  get goals(): FormArray {
    return this.projectForm.get('goals') as FormArray;
  }

  addProductBacklogItem(): void {
    this.productBacklog.push(this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: [''],
    }));
  }

  addSprint(): void {
    this.sprints.push(this.fb.group({
      number: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      backlog: this.fb.array([]),
      reviews: [''],
    }));
  }

  addTeam(): void {
    this.teams.push(this.fb.group({
      name: ['', Validators.required],
      roles: this.fb.array([]),
      members: this.fb.array([]),
    }));
  }

  addRole(teamIndex: number): void {
    const roles = (this.teams.at(teamIndex).get('roles') as FormArray);
    roles.push(this.fb.control(''));
  }

  addMember(teamIndex: number): void {
    const members = (this.teams.at(teamIndex).get('members') as FormArray);
    members.push(this.fb.control(''));
  }

  addGoal(): void {
    this.goals.push(this.fb.group({
      content: ['', Validators.required],
    }));
  }

  previousStep(): void {
    if (this.stepper && this.stepper.previous) {
      this.stepper.previous();
    }
  }

  nextStep(): void {
    if (this.stepper && this.stepper.next) {
      this.stepper.next();
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const newProject: NexusProject = this.projectForm.value;
      this.nexusProjectService.createProject(newProject).subscribe(
        response => {
          this.toastrService.success('Project created successfully!', 'Success');
          this.router.navigate(['/pages/agile/nexus/projects']); // Adjust the route as needed
        },
        error => {
          console.error('Error creating project:', error);
          this.toastrService.danger('Failed to create project. Please try again.', 'Error');
        }
      );
    } else {
      this.toastrService.danger('Please fill in all required fields.', 'Validation Error');
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    this.projectForm.markAllAsTouched();
  }
}
