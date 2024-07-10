import { NgModule } from '@angular/core';
import { NbMenuModule, NbStepperModule, NbCardModule, NbDialogModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TutorialComponent } from './agile/nexus/tutorial.component';
import { TutorialEditComponent } from './agile/nexus/tutorial-edit/tutorial-edit.component';
import { TutorialCreateComponent } from './agile/nexus/tutorial-create/tutorial-create.component'; // Import the new component

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
    FormsModule, // Ensure FormsModule is imported
    ReactiveFormsModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    PagesComponent,
    TutorialComponent,
    TutorialEditComponent,
    TutorialCreateComponent, // Declare the new component
  ],
  providers: [
    // Ensure no unnecessary providers causing conflicts
  ],
})
export class PagesModule { }
