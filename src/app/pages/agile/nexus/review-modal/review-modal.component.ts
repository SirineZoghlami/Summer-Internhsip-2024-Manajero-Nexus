import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NexusProjectService } from '../../../../../services/nexus.project.service.service';

@Component({
  selector: 'ngx-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent {
  reviewContent: string = '';

  constructor(
    private dialogRef: NbDialogRef<ReviewModalComponent>,
    private projectService: NexusProjectService
  ) {}

  submitReview() {
    const currentDateTime = new Date().toISOString(); // Gets current date and time in ISO format

    const review = {
      reviewDate: currentDateTime,
      reviewContent: this.reviewContent
    };

    this.dialogRef.close(review); // Close modal and send review data back
  }
}
