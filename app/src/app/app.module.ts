import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import { TableFilterPipe } from './filter/table-filter.pipe';
import {SidebarModule} from "./sidebar/sidebar.module";
import {HomeLayoutComponent} from "./layout/home-layout.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SidebarModule,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    ListComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    TableFilterPipe,
    HomeLayoutComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
