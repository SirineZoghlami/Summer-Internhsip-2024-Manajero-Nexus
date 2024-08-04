import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProductBacklogItem } from '../../../../models/product-backlog-item.model';
import { ProductBacklogItemService } from '../../../../services/ProductBacklogItemService/product-backlog-item.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent implements OnInit {
  backlogItems: ProductBacklogItem[] = [];
  showForm = false;
  backlogItem: ProductBacklogItem = { title: '', description: '', priority: 'Medium', status: 'To Do' };
  priorities = ['High', 'Medium', 'Low'];
  statuses = ['To Do', 'In Progress', 'Done'];

  constructor(
    private backlogService: ProductBacklogItemService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.loadBacklogItems();
  }

  loadBacklogItems(): void {
    this.backlogService.getAllItems().subscribe(
      data => this.backlogItems = data,
      error => console.error('Error fetching backlog items', error)
    );
  }

  openCreateModal(): void {
    this.showForm = true;
    this.backlogItem = { title: '', description: '', priority: 'Medium', status: 'To Do' };
  }

  openEditModal(item: ProductBacklogItem): void {
    this.showForm = true;
    this.backlogItem = { ...item };
  }

  onSubmit(): void {
    if (this.backlogItem.id) {
      this.backlogService.updateItem(this.backlogItem.id, this.backlogItem).subscribe(
        () => {
          this.loadBacklogItems();
          this.toastrService.success('Backlog item updated successfully!', 'Success');
          this.showForm = false;
        },
        error => {
          console.error('Error updating backlog item', error);
          this.toastrService.danger('Failed to update backlog item. Please try again.', 'Error');
        }
      );
    } else {
      this.backlogService.createItem(this.backlogItem).subscribe(
        () => {
          this.loadBacklogItems();
          this.toastrService.success('Backlog item created successfully!', 'Success');
          this.showForm = false;
        },
        error => {
          console.error('Error creating backlog item', error);
          this.toastrService.danger('Failed to create backlog item. Please try again.', 'Error');
        }
      );
    }
  }

  confirmDelete(id: string): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this backlog item?'
      }
    }).onClose.subscribe(result => {
      if (result) {
        this.backlogService.deleteItem(id).subscribe(
          () => {
            this.loadBacklogItems();
            this.toastrService.success('Backlog item deleted successfully!', 'Success');
          },
          error => {
            console.error('Error deleting backlog item', error);
            this.toastrService.danger('Failed to delete backlog item. Please try again.', 'Error');
          }
        );
      }
    });
  }

  getPriorityClass(priority: string) {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  }
  
}
