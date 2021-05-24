import { NgModule, Component, Compiler, ViewContainerRef, ViewChild, Input, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core'
import {OneComponent, TwoComponent} from "./other.component";

// Helper component to add dynamic components
@Component({
  selector: 'app-dcl-wrapper',
  template: `<div #target></div>`
})
export class DclWrapper {
  @ViewChild('target', { read: ViewContainerRef }) target;
  @Input() type;
  cmpRef: ComponentRef<any>;
  private isViewInitialized: boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler, private cdRef: ChangeDetectorRef) {
    this.type = [OneComponent, TwoComponent];
  }

  updateComponent(): void {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    this.cmpRef = this.target.createComponent(factory);
    this.cmpRef.instance.title = 'asdasd';
    // to access the created instance use
    // this.compRef.instance.someProperty = 'someValue';
    // this.compRef.instance.someOutput.subscribe(val => doSomething());
    this.cdRef.detectChanges();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
