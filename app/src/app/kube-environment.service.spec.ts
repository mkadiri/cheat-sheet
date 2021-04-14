import { TestBed } from '@angular/core/testing';

import { KubeEnvironmentService } from './kube-environment.service';

describe('KubeEnvironmentService', () => {
  let service: KubeEnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KubeEnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
