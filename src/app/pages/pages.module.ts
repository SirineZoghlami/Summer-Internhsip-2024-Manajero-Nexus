import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbCardModule, NbStepperModule, NbDialogModule, NbButtonModule, NbIconModule, NbProgressBarModule, NbSelectModule, NbCalendarModule } from '@nebular/theme';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendarModule
import dayGridPlugin from '@fullcalendar/daygrid'; // Import FullCalendar plugins

import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { TutorialComponent } from './agile/nexus/tutorial.component';
import { TutorialCreateComponent } from './agile/nexus/tutorial-create/tutorial-create.component';
import { TutorialUpdateComponent } from './agile/nexus/tutorial-update/tutorial-update.component';
import { ConfirmationDialogComponent } from './agile/nexus/confirmation-dialog/confirmation-dialog.component';
import { NexusQuizComponent } from './agile/nexus/nexus-quiz/nexus-quiz.component';
import { ErrorMessageComponent } from './agile/nexus/error-message/error-message.component';
import { ProjectsComponent } from './agile/nexus/projects/projects.component';
import { SprintListComponent } from './agile/nexus/sprint-list/sprint-list.component';
import { TeamListComponent } from './agile/nexus/team-list/team-list.component';
import { TeamDetailComponent } from './agile/nexus/team-detail/team-detail.component';
import { TaskListComponent } from './agile/nexus/task-list/task-list.component';
import { TaskCreationModalComponent } from './agile/nexus/task-creation-modal/task-creation-modal.component';
import { NexusBoardComponent } from './agile/nexus/nexus-board/nexus-board.component';
import { NexusTimelineComponent } from './agile/nexus/nexus-timeline/nexus-timeline.component';
import { SprintBacklogComponent } from './agile/nexus/sprint-backlog/sprint-backlog.component';
import { SprintBacklogModalComponent } from './agile/nexus/sprint-backlog-modal/sprint-backlog-modal.component';
import { SprintCreationModalComponent } from './agile/nexus/sprint-creation-modal/sprint-creation-modal.component';
import { TeamCreationModalComponent } from './agile/nexus/team-creation-modal/team-creation-modal.component';
import { NexusCalendarComponent } from './agile/nexus/nexus-calendar/nexus-calendar.component';
import { ProjectOverviewComponent } from './agile/nexus/project-overview/project-overview.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbCardModule,
    NbStepperModule,
    NbDialogModule.forChild(),
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,
    NbSelectModule,
    NbCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    HttpClientModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    FullCalendarModule // Add FullCalendarModule here
  ],
  declarations: [
    PagesComponent,
    TutorialComponent,
    TutorialCreateComponent,
    TutorialUpdateComponent,
    ConfirmationDialogComponent,
    NexusQuizComponent,
    ErrorMessageComponent,
    ProjectsComponent,
    SprintListComponent,
    TeamListComponent,
    TeamDetailComponent,
    TaskListComponent,
    TaskCreationModalComponent,
    NexusBoardComponent,
    NexusTimelineComponent,
    SprintBacklogComponent,
    SprintBacklogModalComponent,
    SprintCreationModalComponent,
    TeamCreationModalComponent,
    NexusCalendarComponent,
    ProjectOverviewComponent
  ],
  providers: [],
})
export class PagesModule { }