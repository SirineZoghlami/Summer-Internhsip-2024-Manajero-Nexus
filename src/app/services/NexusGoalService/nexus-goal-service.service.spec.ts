import { TestBed } from '@angular/core/testing';

import { NexusGoalService } from './nexus-goal-service.service';

describe('NexusGoalServiceService', () => {
  let service: NexusGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NexusGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
