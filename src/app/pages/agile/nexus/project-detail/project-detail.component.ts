import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NexusProject } from '../../../../../models/nexus-proejct-model'; // Adjust the path accordingly

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
}
