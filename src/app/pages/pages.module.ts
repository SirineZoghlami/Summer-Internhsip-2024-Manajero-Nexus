import { NgModule } from '@angular/core';
import { NbMenuModule, NbFormFieldModule, NbStepperModule, NbCardModule, NbDialogModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TutorialComponent } from './agile/nexus/tutorial.component';
import { TutorialCreateComponent } from './agile/nexus/tutorial-create/tutorial-create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TutorialUpdateComponent } from './agile/nexus/tutorial-update/tutorial-update.component';
import { ConfirmationDialogComponent } from './agile/nexus//confirmation-dialog/confirmation-dialog.component';
import { NexusQuizComponent } from './agile/nexus/nexus-quiz/nexus-quiz.component'; // Check path
import {NexusProjectCreateComponent} from './agile/nexus/nexus-project-create/nexus-project-create.component';
import { ProjectListComponent } from './agile/nexus/project-list/project-list.component';
import { ProjectDetailComponent } from './agile/nexus/project-detail/project-detail.component';
import { ProjectUpdateComponent } from './agile/nexus/project-updtae/project-update.component';
import { NexusDashboardComponent } from './agile/nexus/nexus-dashboard/nexus-dashboard.component';
import { ProjectSettingsComponent } from './agile/nexus/project-settings/project-settings.component';
import { SprintListComponent } from './agile/nexus/sprint-list/sprint-list.component';
import { SprintModalComponent } from './agile/nexus/sprint-modal/sprint-modal.component';
import { NexusGoalListComponent } from './agile/nexus/nexus-goal-list/nexus-goal-list.component';
import { GoalModalComponent } from './agile/nexus/goal-modal/goal-modal.component';
import { ProjectOverviewComponent } from './agile/nexus/project-overview/project-overview.component';
import { NexusProductBacklogComponent } from './agile/nexus/nexus-product-backlog/nexus-product-backlog.component';
import { NexusProductBacklogModalComponent } from './agile/nexus/nexus-product-backlog-modal/nexus-product-backlog-modal.component';
import { ReviewModalComponent } from './agile/nexus/review-modal/review-modal.component';
import { ProjectEditModalComponent } from './agile/nexus/project-edit-modal/project-edit-modal.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbStepperModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbDialogModule.forChild(), // Change to .forRoot() if used in an eagerly-loaded module
    CKEditorModule, 
    NbButtonModule,
    NbFormFieldModule,
    NgxEchartsModule,
    ChartModule,

  ],
  declarations: [
    PagesComponent,
    TutorialComponent,
    TutorialCreateComponent,
    TutorialUpdateComponent,
    ConfirmationDialogComponent,
    NexusQuizComponent,
    NexusProjectCreateComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectUpdateComponent,
    NexusDashboardComponent,
    ProjectSettingsComponent,
    SprintListComponent,
    SprintModalComponent,
    NexusGoalListComponent,
    GoalModalComponent,
    ProjectOverviewComponent,
    NexusProductBacklogComponent,
    NexusProductBacklogModalComponent,
    ReviewModalComponent,
    ProjectEditModalComponent,
  ],
  providers: [],
})
export class PagesModule { }
