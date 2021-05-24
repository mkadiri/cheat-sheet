import {Component, Input, OnInit} from '@angular/core';
import {OneComponent} from './other.component';
import {AwsCertificationCloudPractitionerService} from './aws-certification-cloud-practitioner.service';

@Component({
  selector: 'app-better',
  template: `
  <div *ngFor="let tab of tabs">
    <app-dcl-wrapper [type]="tab"></app-dcl-wrapper>
  </div>
`
})
export class BetterComponent implements OnInit{
  @Input() readmeFileLocation: string;
  tabs;
  error: any;
  headers: string[] = [];
  readmeContent: any | undefined;

  constructor(private awsCertificationCloudPractitionerService: AwsCertificationCloudPractitionerService) {}

  ngOnInit(): void{
    this.awsCertificationCloudPractitionerService
      .getConfig(this.readmeFileLocation)
      .subscribe(
        (data: any) => this.onSuccess(data),
        (error: any) => this.handleError(error)
      );
  }

  onSuccess(data: any): void {
    this.readmeContent = data;
    this.tabs = [OneComponent];
  }

  handleError(error: any): void {
    this.readmeContent = 'something went wrong';
    console.error(error);
  }
}
