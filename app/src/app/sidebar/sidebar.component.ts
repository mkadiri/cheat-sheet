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

export interface NavInfo {
  category: string;
  nav: {
    path: string;
    title: string;
    icon: string;
    class: string
    children: {
      path: string;
      title: string;
      icon: string;
      class: string
    }[];
  }[];
}

export const NAV: NavInfo[] = [
  {
    category: "DevOps",
    nav: [
      {
        path: '/kubectl',
        title: 'Kubectl',
        icon: 'nc-bank',
        class: '',
        children: [
          {
            path: '/kubectl',
            title: 'commands',
            icon: 'nc-bank',
            class: ''
          },
          {
            path: '/kubectl',
            title: 'setup',
            icon: 'nc-bank',
            class: ''
          }
        ]
      }
    ]
  },
  {
    category: "Golang",
    nav: [
      {
        path: '/introduction',
        title: 'Introduction',
        icon: 'nc-bank',
        class: '',
        children: [
          {
            path: '/introduction/hello-world',
            title: 'Hello world',
            icon: 'nc-bank',
            class: ''
          }
        ]
      },
      {
        path: '/dashboard',
        title: 'Dashboard',
        icon: 'nc-bank',
        class: '',
        children: []
      },
      {
        path: '/golang/advanced',
        title: 'Advanced',
        icon: 'nc-bank',
        class: '',
        children: [
          {
            path: '/goland/advanced/super-world',
            title: 'Super world',
            icon: 'nc-bank',
            class: ''
          }
        ]
      }
    ]
  }
]

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
    public nav: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.nav = NAV.filter(navItem => navItem);
    }
}
