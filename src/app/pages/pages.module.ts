import { NgModule } from '@angular/core';
import { NbMenuModule, NbStepperModule, NbCardModule, NbDialogModule, NbButtonModule } from '@nebular/theme';
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
import { ConfirmationDialogComponent } from './agile/nexus//confirmation-dialog/confirmation-dialog.component'; // Check path

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
  ],
  declarations: [
    PagesComponent,
    TutorialComponent,
    TutorialCreateComponent,
    TutorialUpdateComponent,
    ConfirmationDialogComponent, // Ensure this component exists
  ],
  providers: [],
})
export class PagesModule { }
