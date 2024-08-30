import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { TutorialComponent } from './agile/nexus/tutorial/tutorial.component';  
import { TutorialCreateComponent } from './agile/nexus/tutorial-create/tutorial-create.component';
import { TutorialUpdateComponent } from './agile/nexus/tutorial-update/tutorial-update.component';
import { NexusQuizComponent } from './agile/nexus/nexus-quiz/nexus-quiz.component'; // Check path
import { NexusProjectCreateComponent } from './agile/nexus/nexus-project-create/nexus-project-create.component';
import { ProjectListComponent } from './agile/nexus/project-list/project-list.component';
import { ProjectUpdateComponent } from './agile/nexus/project-updtae/project-update.component';
import { NexusDashboardComponent } from './agile/nexus/nexus-dashboard/nexus-dashboard.component';
import { ProjectSettingsComponent } from './agile/nexus/project-settings/project-settings.component';
import { SprintListComponent } from './agile/nexus/sprint-list/sprint-list.component';
import { NexusGoalListComponent } from './agile/nexus/nexus-goal-list/nexus-goal-list.component'; // Import the new component
import { GoalModalComponent } from './agile/nexus/goal-modal/goal-modal.component';
import { ProjectOverviewComponent } from './agile/nexus/project-overview/project-overview.component'

import { NexusProductBacklogComponent } from './agile/nexus/nexus-product-backlog/nexus-product-backlog.component'

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
      path: 'agile/nexus/project/create',
      component: NexusProjectCreateComponent
    },
    {
      path: 'agile/nexus/project',
      component: ProjectListComponent
    },
    {
      path: 'agile/nexus/dashboard',
      component: NexusDashboardComponent 
    },
  
    {
      path: 'agile/project-settings/:id',
      component: ProjectSettingsComponent,
      children: [
        {
          path: '',
          redirectTo: 'project-overview',
          pathMatch: 'full'
        },
        {
          path: 'project-overview',
          component: ProjectOverviewComponent
        },
        {
          path: 'sprint-list',
          component: SprintListComponent
        },
        {
          path: 'nexus-goals',
          component: NexusGoalListComponent
        },
        {
          path: 'nexus-product-backlog',
          component: NexusProductBacklogComponent
        }
      ]
    }
,    
    


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
