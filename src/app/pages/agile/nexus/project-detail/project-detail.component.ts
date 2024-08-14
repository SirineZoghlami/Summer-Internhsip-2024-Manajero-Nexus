import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NexusProject, Sprint, TeamMember } from '../../../../../models/nexus-proejct-model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  @Input() project: NexusProject | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  getSprintReviews(sprint: Sprint): string {
    return sprint.reviews?.map(review => review.reviewContent).join(', ') || 'No reviews';
  }

  getFormattedMembers(members: TeamMember[] | undefined): string {
    return members?.map(member => member.name).join(', ') || 'No members';
  }
}
