import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AwsCertificationCloudPractitionerService} from './aws-certification-cloud-practitioner.service';
import {OneComponent, ThreeComponent, TwoComponent} from './other.component';

@Component({
  moduleId: module.id,
  providers: [ AwsCertificationCloudPractitionerService ],
  templateUrl: 'aws-certification-cloud-practitioner.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class AwsCertificationCloudPractitionerComponent implements OnInit{
  error: any;
  headers: string[] = [];
  readme: any | undefined;
  public hello = 'abc';
  public hey: any;

  constructor(private awsCertificationCloudPractitionerService: AwsCertificationCloudPractitionerService) {
    const res = this.awsCertificationCloudPractitionerService.getConfig()
      .subscribe(
        (data: any) => this.onSuccess(data),
        (error: any) => this.handleError(error)
      );
    // this.hey = [OneComponent, TwoComponent, ThreeComponent, ThreeComponent];
    this.hey = [OneComponent];
  }

  ngOnInit(): void{}

  onSuccess(data: any): void {
    // this.readme = data;
    this.readme = '<div>hellow</div>';
  }

  handleError(error: any): void {
    this.readme = 'something went wrong';
    console.error(error);
  }
}


