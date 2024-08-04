import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ProductBacklogItemService } from '../../../../services/ProductBacklogItemService/product-backlog-item.service';
import { ProductBacklogItem } from '../../../../models/product-backlog-item.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent implements OnInit {
  productBacklogItems: ProductBacklogItem[] = [];
  backlogForm: FormGroup;
  isEdit = false;
  currentItemId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private backlogItemService: ProductBacklogItemService,
    private dialogService: NbDialogService
  ) {
    this.backlogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBacklogItems();
  }

  loadBacklogItems(): void {
    this.backlogItemService.getAllItems().subscribe(items => {
      this.productBacklogItems = items;
    });
  }

  openCreateModal(): void {
    this.isEdit = false;
    this.currentItemId = null;
    this.backlogForm.reset();
  }

  openEditModal(item: ProductBacklogItem): void {
    this.isEdit = true;
    this.currentItemId = item.id;
    this.backlogForm.patchValue(item);
  }

  onSubmit(): void {
    if (this.backlogForm.valid) {
      const item: ProductBacklogItem = this.backlogForm.value;
      if (this.isEdit && this.currentItemId) {
        this.backlogItemService.updateItem(this.currentItemId, item).subscribe(() => {
          this.loadBacklogItems();
          this.backlogForm.reset();
          this.isEdit = false;
          this.currentItemId = null;
        });
      } else {
        this.backlogItemService.createItem(item).subscribe(() => {
          this.loadBacklogItems();
          this.backlogForm.reset();
        });
      }
    }
  }

  deleteItem(id: string): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this item?'
      }
    }).onClose.subscribe(confirmed => {
      if (confirmed) {
        this.backlogItemService.deleteItem(id).subscribe(() => {
          this.loadBacklogItems();
        });
      }
    });
  }
}
