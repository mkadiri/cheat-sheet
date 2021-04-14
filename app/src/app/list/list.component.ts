import { Component, OnInit } from '@angular/core';
import {KubeEnvironmentService} from '../kube-environment.service';
import {KubeEnvironment} from '../kube-environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.css' ]
})
export class ListComponent implements OnInit {
  environments: KubeEnvironment[] = [];
  tableFilterInput: '';

  constructor(private kubeEnvironmentService: KubeEnvironmentService) { }

  ngOnInit(): void {
    this.getEnvironments();
  }

  getEnvironments(): void {
    this.kubeEnvironmentService.getEnvironments()
      .subscribe(environments => this.environments = environments);
  }
}
