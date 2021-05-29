import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AwsCertificationCloudPractitionerService} from './aws-certification-cloud-practitioner.service';

@Component({
  moduleId: module.id,
  providers: [ AwsCertificationCloudPractitionerService ],
  templateUrl: 'aws-certification.html',
  encapsulation: ViewEncapsulation.None,
})

export class AwsCertificationCloudPractitionerComponent implements OnInit{
  ngOnInit(): void{}
}


