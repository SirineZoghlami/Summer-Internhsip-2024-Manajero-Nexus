import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { NexusProjectService } from '../../../../core/services/nexus-services/nexus.project.service.service';
import { NexusProject } from '../../../../core/models/nexus-models/nexus-proejct-model';

@Component({
  selector: 'ngx-project-edit-modal',
  templateUrl: './project-edit-modal.component.html',
  styleUrls: ['./project-edit-modal.component.scss']
})
export class ProjectEditModalComponent {
  editForm: FormGroup;
  project!: NexusProject; // Define project property

  constructor(
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<ProjectEditModalComponent>,
    private projectService: NexusProjectService
  ) {
    this.editForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  // Method to initialize the form with the provided project data
  setProjectData(project: NexusProject): void {
    this.project = project;
    this.editForm.patchValue({
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate
    });
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      const updatedProject = { ...this.project, ...this.editForm.value };
      this.projectService.updateProject(updatedProject.id, updatedProject).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating project', error);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
