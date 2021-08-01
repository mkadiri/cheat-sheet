const formatter = require('./readme-data-formatter');
const fs = require('fs');
const glob = require('glob');

interface Routes {
  title: string;
  nav: {
    path: string;
    title: string;
    children: string[];
  }[];
}

class ReadmeHtmlConvertor {
  private formatter: any;

  constructor() {
    this.formatter = new formatter();
  }

  convert(): void {
    glob('build-scripts/docs/**/*.md', (er, files) => {
      files.forEach(filePath => {
        const path = filePath.match(/(?<=docs\/)(.*)(?=[\/][ \w-]+.md)/)[0];
        const fileName = filePath.match(/[ \w-]+?(?=\.)/s)[0];
        const componentFolderPath = `src/app/pages/${path}/${fileName}`;
        const filePathParts = this.getFilePathParts(filePath);

        // create dir
        if (!fs.existsSync(componentFolderPath)){
          fs.mkdirSync(componentFolderPath, { recursive: true });
        }

        this.generateComponentHtml(fileName, filePath, componentFolderPath);
        this.generateComponentTs(fileName, filePath, componentFolderPath);
        // this.addToMainRoutes(fileName, filePath);
        this.addToNavigationRoutes(fileName, filePathParts);
      });
    });
  }

  getFilePathParts(filePath: string, includeFileType: boolean = false): string[] {
    let data: string = filePath;

    if (!includeFileType) {
      data = filePath.split('.').slice(0, -1).join('.');
    }

    return data.split('/');
  }

  generateComponentHtml(fileName: string, filePath: string, componentFolderPath): void {
    let fileData = fs.readFileSync(filePath, 'utf8');
    fileData = this.formatter.format(fileData);
    const htmlOutputPath = `${componentFolderPath}/${fileName}.component.html`;
    fs.writeFileSync(htmlOutputPath, fileData);
  }

  generateComponentTs(fileName, filePath, componentFolderPath): void {
    let fileData = fs.readFileSync('build-scripts/templates/template.component.ts', 'utf8');
    const camelCaseFileName = `-${fileName}`.replace(/-([a-z])/g, (m, w) => {
      return w.toUpperCase();
    });

    const componentName = `${camelCaseFileName}Component`;
    fileData = fileData.replace(/{{componentName}}/g, componentName);

    const htmlFilePath = `${fileName}.component.html`;
    fileData = fileData.replace(/{{htmlFilePath}}/g, htmlFilePath);

    const htmlOutputPath = `${componentFolderPath}/${fileName}.component.ts`;
    fs.writeFileSync(htmlOutputPath, fileData);
  }

  // addToMainRoutes(fileName: string, filePath: string): void {
  //   let fileData = fs.readFileSync('src/app/routing/main.routes.ts', 'utf8');
  //   const camelCaseFileName = `-${fileName}`.replace(/-([a-z])/g, (m, w) => {
  //     return w.toUpperCase();
  //   });
  //
  //   const componentName = `${camelCaseFileName}Component`;
  //
  //   if (fileData.match(componentName)) {
  //     return;
  //   }
  //
  //   const imports = fileData.match(/import(.*)/g);
  //   const newImports = fileData.match(/import(.*)/g);
  //   const fullPath = filePath.split('.').slice(0, -1).join('.').split('/');
  //
  //   newImports.push(`import {${componentName}} from '../pages/${fullPath.slice(2, 5).join('/')}/${fullPath.slice(4, 5).join('/')}.component';`);
  //   fileData = fileData.replace(imports.join('\n'), newImports.join('\n'));
  //
  //   const routePath = filePath.split('.').slice(0, -1).join('.').split('/').slice(3, 5).join('/');
  //
  //   const routes = fileData.match(/^ {2}{([\S\s]*?)}/gm);
  //   const newRoutes = fileData.match(/^ {2}{([\S\s]*?)}/gm);
  //   newRoutes.push(
  //     `  {\n` +
  //     `    path: '${routePath}',\n` +
  //     `    component: ${componentName}\n` +
  //     `  }`
  //   );
  //
  //   fileData = fileData.replace(routes.join(',\n'), newRoutes.join(',\n'));
  //
  //   fs.writeFileSync(`src/app/routing/main.routes.ts`, fileData);
  // }

  addToNavigationRoutes(filename: string, filePath: string[]): void {
    const fileData = fs.readFileSync('src/app/routing/navigation.routes.ts', 'utf8');
    const currRoutes: Routes[] = this.routesHtmlToInterface(fileData);

    // currRoutes.forEach(routes => {
    //   routes.nav
    // })

    console.log(filePath);

  }

  routesHtmlToInterface(data: string): Routes[] {
    const navigationRoutes = data.match(/(?<== )(\[\n )([\S\s]*?])(?=;)/gm)[0];
    const categories = navigationRoutes.match(/(?<=^) {2}{[\S\s]*?^ {2}}/gm);

    const all: Routes[] = [];

    categories.forEach(category => {
      const routes: Routes = {
        title: category.match(/(?<=category: ').*(?=',)/gm)[0],
        nav: []
      };

      category.match(/^ {6}{[\S\s]*?^ {6}}/gm).forEach(navItem => {
        const currNav = {
          path: navItem.match(/(?<=^( {8})path: ').*(?=',)/gm)[0],
          title: navItem.match(/(?<=^( {8})title: ').*(?=',)/gm)[0],
          children: []
        };

        navItem.match(/^ {10}{[\S\s]*?^ {10}}/gm).forEach(child => {
          currNav.children.push(child);
        });

        routes.nav.push(currNav);
      });

      all.push(routes);
    });

    return all;
  }
}

module.exports = ReadmeHtmlConvertor;
