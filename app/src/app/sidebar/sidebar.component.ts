import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children: {
      path: string;
      title: string;
      icon: string;
      class: string;
    }[];
}


// {
//   path: string;
//   children: {
//     path: string;
//     icon: string;
//     title: string; class: string
//   }[];
//   icon: string;
//   title: string;
//   class: string
// } | { path: string; icon: string; title: string; class: string } | { path: string; icon: string; title: string; class: string } | { path: string; icon: string; title: string; class: string } | { path: string; icon: string; title: string; class: string } | { path: string; icon: string; title: string; class: string } | { path: string; icon: string; title: string; class: string } | { path: string; icon: string; title: string; class: string })[] = [


export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon:'nc-bank',
    class: '',
    children: [
      {
        path: '/dashboard/hello-world',
        title: 'hello world',
        icon:'nc-bank',
        class: ''
      },
    ]
  },
  {
    path: '/maps',
    title: 'Maps',
    icon:'nc-bank',
    class: '',
    children: []
  },
  {
    path: '/user',
    title: 'User',
    icon:'nc-bank',
    class: '',
    children: [
      {
        path: '/user/hi',
        title: 'hi',
        icon:'nc-bank',
        class: ''
      },
    ]
  }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
