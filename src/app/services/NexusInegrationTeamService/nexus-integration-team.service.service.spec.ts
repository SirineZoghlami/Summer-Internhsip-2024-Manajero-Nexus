import { TestBed } from '@angular/core/testing';

import { NexusIntegrationTeamService } from './nexus-integration-team.service.service';

describe('NexusIntegrationTeamServiceService', () => {
  let service: NexusIntegrationTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NexusIntegrationTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
