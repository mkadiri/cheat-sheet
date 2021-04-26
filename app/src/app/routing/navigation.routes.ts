export interface NavigationRoutes {
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

export const NAVIGATION_ROUTES: NavigationRoutes[] = [
  {
    category: "DevOps",
    nav: [
      {
        path: '/kubectl',
        title: 'Kubectl',
        children: [
          {
            path: '/kubectl/cheat-sheet',
            title: 'Cheat sheet',
          }
        ]
      },
      {
        path: '/docker',
        title: 'Docker',
        children: [
          {
            path: '/docker/cheat-sheet',
            title: 'Cheat sheet',
          }
        ]
      }
    ]
  }
]
