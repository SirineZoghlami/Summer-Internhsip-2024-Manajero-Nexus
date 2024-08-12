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
  statuses = ['Done', 'In Progress', 'Not Done', 'Review']; // Status options
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
      status: ['']  // Initialize status as an empty string
    }));
  }

  addSprint(): void {
    this.sprints.push(this.fb.group({
      number: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reviews: this.fb.array([]),  // Initialize reviews as an empty FormArray
      completed: [false],  // Default value for completed
    }));
  }

  addTeam(): void {
    this.teams.push(this.fb.group({
      id: [''],  // Initialize id as an empty string
      name: ['', Validators.required],
      description: [''],
      members: this.fb.array([]),
      roles: this.fb.array([])  // Initialize roles as an empty FormArray
    }));
  }

  addRole(teamIndex: number): void {
    const roles = (this.teams.at(teamIndex).get('roles') as FormArray);
    roles.push(this.fb.control(''));
  }

  addMember(teamIndex: number): void {
    const members = (this.teams.at(teamIndex).get('members') as FormArray);
    members.push(this.fb.group({
      id: [''],  // Initialize id as an empty string
      name: ['', Validators.required],
      role: ['', Validators.required],
    }));
  }

  addGoal(): void {
    this.goals.push(this.fb.group({
      content: ['', Validators.required],
    }));
  }

  addReview(sprintIndex: number): void {
    const nowDate = new Date().toISOString().split('T')[0]; // ISO format date string without time
    const reviews = (this.sprints.at(sprintIndex).get('reviews') as FormArray);
    reviews.push(this.fb.group({
      reviewDate: [nowDate], // Set the current date as the default value
      reviewContent: [''],
    }));
  }

  previousStep(): void {
    if (this.stepper && this.stepper.previous) {
      this.stepper.previous();
    }
  }

  nextStep(): void {
    this.markAllAsTouched(); // Ensure all controls are marked as touched
    if (this.projectForm.valid && this.stepper) {
      this.stepper.next();
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const newProject = {
        ...this.projectForm.value,
        sprints: this.projectForm.value.sprints.map(sprint => ({
          ...sprint,
          reviews: []  // Pass empty array for reviews
        }))
      };
  
      this.nexusProjectService.createProject(newProject).subscribe(
        response => {
          this.toastrService.success('Project created successfully!', 'Success');
          this.router.navigate(['/pages/agile/nexus/project']);
        },
        error => {
          console.error('Error creating project:', error);
          this.toastrService.danger('Failed to create project. Please try again.', 'Error');
        }
      );
    } 
  }

  private markAllAsTouched(): void {
    this.projectForm.markAllAsTouched();
  }
}
