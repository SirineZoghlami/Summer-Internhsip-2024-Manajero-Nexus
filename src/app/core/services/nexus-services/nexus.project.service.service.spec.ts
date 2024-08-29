import { TestBed } from '@angular/core/testing';

import { NexusProjectService } from './nexus.project.service.service';

describe('NexusProjectServiceService', () => {
  let service: NexusProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NexusProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
