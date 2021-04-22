import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRouting } from './app.routing';

import { AppComponent } from './app.component';
import {SidebarModule} from "./sidebar/sidebar.module";
import {HomeLayoutComponent} from "./layout/home-layout.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    HttpClientModule,
    SidebarModule,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    HomeLayoutComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
