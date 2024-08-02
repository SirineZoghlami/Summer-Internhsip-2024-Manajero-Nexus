import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects = [
    { id: '1', name: 'Project 1', description: 'Description for Project 1' },
    { id: '2', name: 'Project 2', description: 'Description for Project 2' },
    { id: '3', name: 'Project 3', description: 'Description for Project 3' }
  ];

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {}

  createProject(): void {
    this.router.navigate(['/pages/agile/nexus/project/create']);
  }

  editProject(projectId: string): void {
    this.router.navigate(['/pages/agile/nexus/project/edit', projectId]);
  }

  tryNexus(projectId: string): void {
    this.router.navigate(['pages/agile/nexus-board', ]);
  }

  confirmDelete(projectId: string): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this project?'
      }
    }).onClose.subscribe((confirmed: boolean) => {
      if (confirmed) this.deleteProject(projectId);
    });
  }

  deleteProject(projectId: string): void {
    this.projects = this.projects.filter(project => project.id !== projectId);
    this.toastrService.success('Project deleted successfully');
  }
}
