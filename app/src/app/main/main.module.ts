import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {MAIN_ROUTES} from "../routing/main.routes";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {KubectlComponent} from "../pages/kubectl/kubectl.component";
import { ClipboardModule } from 'ngx-clipboard';
import { CodeBoxComponent } from '../code-box/code-box.component';
import { ModalComponent } from '../modal/modal.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {DockerComponent} from "../pages/docker/docker.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MAIN_ROUTES),
    FormsModule,
    NgbModule,
    ClipboardModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HighlightModule
  ],
  declarations: [
    KubectlComponent,
    DockerComponent,
    CodeBoxComponent,
    ModalComponent
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
})

export class MainModule {}
