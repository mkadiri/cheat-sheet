import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import {SidebarModule} from "./sidebar/sidebar.module";
import {MainComponent} from "./main/main.component";
import { ClipboardModule } from 'ngx-clipboard';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpClientModule,
    SidebarModule,
    FontAwesomeModule,
    ClipboardModule,
    HighlightModule
  ],
  declarations: [
    AppComponent,
    MainComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbers: true,
      }
    }
  ],
})

export class AppModule { }
