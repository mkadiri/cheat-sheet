import { Component, OnInit } from '@angular/core';
import {KubeEnvironmentService} from '../kube-environment.service';
import {KubeEnvironment} from '../kube-environment';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: [ './home-layout.component.css' ]
})
export class HomeLayoutComponent implements OnInit {
  constructor(private kubeEnvironmentService: KubeEnvironmentService) { }

  ngOnInit(): void {
  }
}
