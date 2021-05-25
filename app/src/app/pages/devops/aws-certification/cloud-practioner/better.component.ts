import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input, QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {OneComponent} from './other.component';
import {AwsCertificationCloudPractitionerService} from './aws-certification-cloud-practitioner.service';

@Component({
  selector: 'app-better',
  template: `
    <div *ngFor="let box of boxes; let i = index" >
      <ng-template #dynamic></ng-template>
    </div>
    `
})
export class BetterComponent{
  @ViewChildren('dynamic', {read: ViewContainerRef}) public widgetTargets: QueryList<ViewContainerRef>;
  @Input() readmeFileLocation: string;
  boxes = [OneComponent, OneComponent];
  error: any;
  readmeContent: any | undefined;
  cmpRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private awsCertificationCloudPractitionerService: AwsCertificationCloudPractitionerService
  ) {}

  ngAfterViewInit() {
    this.awsCertificationCloudPractitionerService
      .getConfig(this.readmeFileLocation)
      .subscribe(
        (data: any) => this.onSuccess(data),
        (error: any) => this.handleError(error)
      );
  }

  onSuccess(data: any): void {
    this.readmeContent = data;
    // this.boxes = [OneComponent, OneComponent];
    this.updateComponent();
  }

  handleError(error: any): void {
    this.readmeContent = 'something went wrong';
    console.error(error);
  }

  updateComponent(): void {
    for (let i = 0; i < this.widgetTargets.toArray().length; i++) {
      const target = this.widgetTargets.toArray()[i];
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.boxes[i]);
      const cmpRef = target.createComponent(factory);

      if (cmpRef.instance.hasOwnProperty('title')) {
        cmpRef.instance.title = 'abasdhsajhd';
        cmpRef.instance.body = `
          <app-code-box
            comment='check status is clean, i.e. no output from command'
            code='git status'>
          </app-code-box>`;
      }
    }
  }
}
