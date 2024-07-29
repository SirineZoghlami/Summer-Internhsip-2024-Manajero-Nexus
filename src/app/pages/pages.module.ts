import { NgModule } from '@angular/core';
import { NbMenuModule, NbStepperModule, NbCardModule, NbDialogModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TutorialComponent } from './agile/nexus/tutorial.component';
import { TutorialCreateComponent } from './agile/nexus/tutorial-create/tutorial-create.component';
import { TutorialUpdateComponent } from './agile/nexus/tutorial-update/tutorial-update.component';
import { ConfirmationDialogComponent } from './agile/nexus/confirmation-dialog/confirmation-dialog.component';
import { NexusQuizComponent } from './agile/nexus/nexus-quiz/nexus-quiz.component';
import { ErrorMessageComponent } from './agile/nexus/error-message/error-message.component';
import { ProjectsComponent } from './agile/nexus/projects/projects.component';
import { SprintListComponent } from './agile/nexus/sprint-list/sprint-list.component';
import { SprintDetailComponent } from './agile/nexus/sprint-detail/sprint-detail.component';
import { TeamListComponent } from './agile/nexus/team-list/team-list.component';
import { TeamDetailComponent } from './agile/nexus/team-detail/team-detail.component';
import { TaskListComponent } from './agile/nexus/task-list/task-list.component';
import { TaskCreationModalComponent } from './agile/nexus/task-creation-modal/task-creation-modal.component';
import { NexusBoardComponent } from './agile/nexus/nexus-board/nexus-board.component';
import { NbLayoutModule, NbSidebarModule, } from '@nebular/theme';

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
    NbDialogModule.forChild(), 
    CKEditorModule, 
    NbButtonModule,
    HttpClientModule,
    NbLayoutModule,
    NbSidebarModule,

    

   
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
    SprintDetailComponent,
    TeamListComponent,
    TeamDetailComponent,
    TaskListComponent,
    TaskCreationModalComponent,
    NexusBoardComponent,

    
    


  ],
  providers: [],
})
export class PagesModule { }
