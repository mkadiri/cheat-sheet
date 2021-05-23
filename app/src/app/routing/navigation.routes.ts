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
        path: '/kubernetes',
        title: 'Kubernetes',
        children: [
          {
            path: '/kubernetes/kubectl-cheat-sheet',
            title: 'Kubectl cheat sheet',
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
      },
      {
        path: '/aws-certification',
        title: 'AWS Certification',
        children: [
          {
            path: '/aws-certification/cloud-practitioner',
            title: 'Cloud Practitioner',
          }
        ]
      },
      {
        path: '/aws-cdk',
        title: 'AWS CDK',
        children: [
          {
            path: '/aws-cdk/cheat-sheet',
            title: 'Cheat sheet',
          }
        ]
      },
      {
        path: '/newrelic',
        title: 'Newrelic',
        children: [
          {
            path: '/newrelic/cheat-sheet',
            title: 'Cheat sheet',
          }
        ]
      }
    ]
  },
  {
    category: "Programming",
    nav: [
      {
        path: '/node',
        title: 'Node',
        children: [
          {
            path: '/node/npm',
            title: 'NPM',
          }
        ]
      }
    ]
  },
  {
    category: "Databases",
    nav: [
      {
        path: '/mysql',
        title: 'Mysql',
        children: [
          {
            path: '/mysql/cheat-sheet',
            title: 'Cheat sheet',
          }
        ]
      }
    ]
  },
  {
    category: "Other",
    nav: [
      {
        path: '/git',
        title: 'Git',
        children: [
          {
            path: '/git/cheat-sheet',
            title: 'Cheat sheet',
          }
        ]
      }
    ]
  }
]
