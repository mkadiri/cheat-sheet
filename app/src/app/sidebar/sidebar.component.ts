import { Component, OnInit } from '@angular/core';
import {NAVIGATION_ROUTES} from "../routing/navigation.routes";

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public nav: any[];

    ngOnInit() {
        this.nav = NAVIGATION_ROUTES.filter(navItem => navItem);
    }
}
