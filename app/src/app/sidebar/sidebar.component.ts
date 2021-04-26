import { Component, OnInit } from '@angular/core';
import {NAVIGATION_ROUTES} from "../routing/navigation.routes";
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public navigationRoutes: any[];
  public activeNav = null;

  constructor(private router: Router) {}

  ngOnInit() {
    let base = this.router.url;
    // console.log(this.router.url.base);
    this.navigationRoutes = NAVIGATION_ROUTES.filter(navItem => navItem);

    this.navigationRoutes.forEach((navigationRoute) => {
      navigationRoute.nav.forEach(nav => {
        nav.children.forEach(child => {
          if (base == child.path) {
            this.activeNav = nav.path;
          }
          console.log(child.path);
        })
      })
      // console.log('elem: ' + elem);
    });

    console.log('activeNav: ' + this.activeNav);
  }
}
