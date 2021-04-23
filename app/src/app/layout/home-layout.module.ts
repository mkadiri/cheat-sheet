import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminLayoutRoutes } from './home-layout.routing';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {KubectlComponent} from "../pages/kubectl/kubectl.component";
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ClipboardModule,
    FontAwesomeModule
  ],
  declarations: [
    DashboardComponent,
    KubectlComponent
  ]
})

export class AdminLayoutModule {}
