import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NexusGoalService } from '../../../../services/NexusGoalService/nexus-goal-service.service';
import { NexusGoal } from '../../../../models/nexus-goal';

@Component({
  selector: 'app-nexus-goal-modal',
  templateUrl: './nexus-goal-modal.component.html',
  styleUrls: ['./nexus-goal-modal.component.scss']
})
export class NexusGoalModalComponent {
  @Input() goal: NexusGoal | null = null;
  goalForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    protected dialogRef: NbDialogRef<NexusGoalModalComponent>,
    private fb: FormBuilder,
    private nexusGoalService: NexusGoalService
  ) {
    this.goalForm = this.fb.group({
      goal: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.goal) {
      this.isEdit = true;
      this.goalForm.patchValue(this.goal);
    }
  }

  submit() {
    if (this.goalForm.valid) {
      const goalData: NexusGoal = this.goalForm.value;
      if (this.isEdit && this.goal) {
        const updatedGoal: NexusGoal = { ...this.goal, ...goalData };
        this.nexusGoalService.updateGoal(this.goal.id!, updatedGoal).subscribe(
          () => this.dialogRef.close('updated'),
          error => console.error('Error updating goal', error)
        );
      } else {
        this.nexusGoalService.createGoal(goalData).subscribe(
          () => this.dialogRef.close('created'),
          error => console.error('Error creating goal', error)
        );
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
