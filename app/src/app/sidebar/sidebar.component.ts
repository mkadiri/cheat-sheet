import { Component, OnInit } from '@angular/core';

export interface NavInfo {
  category: string;
  nav: {
    path: string;
    title: string;
    children: {
      path: string;
      title: string;
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
        children: [
          {
            path: '/kubectl',
            title: 'Cheat sheet',
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
        children: [
          {
            path: '/introduction/hello-world',
            title: 'Hello world',
          }
        ]
      },
      {
        path: '/dashboard',
        title: 'Dashboard',
        children: []
      },
      {
        path: '/golang/advanced',
        title: 'Advanced',
        children: [
          {
            path: '/goland/advanced/super-world',
            title: 'Super world',
          }
        ]
      }
    ]
  }
]

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public nav: any[];

    ngOnInit() {
        this.nav = NAV.filter(navItem => navItem);
    }
}
