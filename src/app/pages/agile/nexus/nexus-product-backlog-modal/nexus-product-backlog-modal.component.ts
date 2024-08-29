import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductBacklogItem } from '../../../../core/models/nexus-models/nexus-proejct-model';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-nexus-product-backlog-modal',
  templateUrl: './nexus-product-backlog-modal.component.html',
  styleUrls: ['./nexus-product-backlog-modal.component.scss']
})
export class NexusProductBacklogModalComponent {
  newBacklog: ProductBacklogItem = {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
  };

  constructor(protected dialogRef: NbDialogRef<NexusProductBacklogModalComponent>) {}

  save() {
    this.dialogRef.close(this.newBacklog);
  }

  cancel() {
    this.dialogRef.close();
  }
}