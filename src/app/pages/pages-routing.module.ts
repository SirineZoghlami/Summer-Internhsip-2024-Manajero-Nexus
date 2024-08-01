import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { TutorialComponent } from './agile/nexus/tutorial.component';  
import { TutorialCreateComponent } from './agile/nexus/tutorial-create/tutorial-create.component';
import { TutorialUpdateComponent } from './agile/nexus/tutorial-update/tutorial-update.component';
import { NexusQuizComponent } from './agile/nexus/nexus-quiz/nexus-quiz.component'; 
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


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'agile/nexus',  
      component: TutorialComponent
    },
  
    {
      path: 'agile/nexus/tutorial/create',  
      component: TutorialCreateComponent
    },
    {
      path: 'agile/nexus/tutorial/update/:id',
      component: TutorialUpdateComponent
    },
    {
      path: 'agile/nexus/quizz',
      component: NexusQuizComponent
    },
    {
      path: 'agile/nexus/projects',
      component: ProjectsComponent
    },
   
    
   
   
 
 
    {
      path: 'agile/nexus-board',  
      component: NexusBoardComponent,
      children: [
        { path: 'sprint-list', component: SprintListComponent },
        { path: 'sprint-create', component: SprintCreationModalComponent },
        { path: 'team-list', component: TeamListComponent },
        { path: 'team-detail', component: TeamDetailComponent },
        { path: 'task-list', component: TaskListComponent },
        { path: 'task-create', component: TaskCreationModalComponent },
        { path: 'nexus-timeline', component: NexusTimelineComponent},
        {path : 'sprint-backlog', component:SprintBacklogComponent},
        {path : 'sprint-backlog-modal', component:SprintBacklogModalComponent},



        // Add other child routes here if needed
      ]
    },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
