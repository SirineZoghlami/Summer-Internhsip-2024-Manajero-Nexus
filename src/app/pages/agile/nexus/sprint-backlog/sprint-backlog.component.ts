// sprint-backlog.component.ts

import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SprintBacklogModalComponent } from '../sprint-backlog-modal/sprint-backlog-modal.component';
import { SprintBacklogService } from '../../../../../services/SprintBacklogService';

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})
export class SprintBacklogComponent implements OnInit {
  backlogItems: any[] = [];
  pagedBacklogItems: any[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  isEmpty: boolean = true;

  constructor(
    private dialogService: NbDialogService,
    private sprintBacklogService: SprintBacklogService,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadSprintBacklogs();
  }

  loadSprintBacklogs(): void {
    this.sprintBacklogService.getAllSprintBacklogs().subscribe(
      data => {
        this.backlogItems = data;
        this.isEmpty = this.backlogItems.length === 0;
        this.totalItems = this.backlogItems.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagedItems();
        this.cdr.detectChanges(); // Ensure view is updated
      },
      error => {
        console.error('Error fetching sprint backlogs', error);
        this.toastrService.danger('Failed to load sprint backlogs.', 'Error');
      }
    );
  }

  updatePagedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedBacklogItems = this.backlogItems.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedItems();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedItems();
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  }

  getStatusClass(status: string | null): string {
    if (!status) {
      return 'status-default';
    }
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-default';
    }
  }

  viewDetails(item: any): void {
    alert(`Viewing details for: ${item.title}`);
  }

  markAsCompleted(item: any): void {
    this.sprintBacklogService.updateSprintBacklogStatus(item.id, 'Completed').subscribe(
      response => {
        item.status = 'Completed';
        this.toastrService.success('Sprint backlog marked as completed.', 'Success');
      },
      error => {
        console.error('Error updating sprint backlog status', error);
        this.toastrService.danger('Failed to mark sprint backlog as completed.', 'Error');
      }
    );
  }

  openSprintModal(): void {
    const dialogRef = this.dialogService.open(SprintBacklogModalComponent, {
      context: {
        title: 'Add New Sprint',
        description: 'Enter the details for the new sprint'
      }
    });

    dialogRef.onClose.subscribe((newSprintBacklog: any) => {
      if (newSprintBacklog) {
        this.zone.run(() => {
          this.loadSprintBacklogs(); // Refresh the data inside NgZone
          this.toastrService.success('New sprint backlog added successfully.', 'Success');
        });
      }
    });
  }
}
