import {
  ChangeDetectorRef,
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OneComponent} from './other.component';
import {AwsCertificationCloudPractitionerService} from './aws-certification-cloud-practitioner.service';

@Component({
  selector: 'app-better',
  template: `<div #target></div>`
})
export class BetterComponent{
  @ViewChild('target', { read: ViewContainerRef }) target;
  @Input() readmeFileLocation: string;
  components;
  error: any;
  readmeContent: any | undefined;
  cmpRef: ComponentRef<any>;
  private isViewInitialized = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private awsCertificationCloudPractitionerService: AwsCertificationCloudPractitionerService, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.awsCertificationCloudPractitionerService
      .getConfig(this.readmeFileLocation)
      .subscribe(
        (data: any) => this.onSuccess(data),
        (error: any) => this.handleError(error)
      );
  }

  onSuccess(data: any): void {
    console.log('onSuccess');
    this.isViewInitialized = true;
    this.readmeContent = data;
    this.components = [OneComponent];
    this.updateComponent();
  }

  handleError(error: any): void {
    this.readmeContent = 'something went wrong';
    console.error(error);
  }

  updateComponent(): void {
    console.log('updateComponent');

    if (!this.isViewInitialized || this.components === undefined) {
      return;
    }

    // this.components.forEach(component => {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    let component = OneComponent;
    let factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.cmpRef = this.target.createComponent(factory);
    this.cmpRef.instance.title = 'uggdtdtdfguyg';
    // to access the created instance use
    // this.compRef.instance.someProperty = 'someValue';
    // this.compRef.instance.someOutput.subscribe(val => doSomething());
    this.cdRef.detectChanges();
    // });
  }

  // ngOnChanges() {
  //   this.updateComponent();
  // }
  //
  //
  //
  // ngOnDestroy() {
  //   if (this.cmpRef) {
  //     this.cmpRef.destroy();
  //   }
  // }
}
