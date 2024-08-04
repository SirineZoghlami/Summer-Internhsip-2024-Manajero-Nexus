import { TestBed } from '@angular/core/testing';

import { SprintBacklogItemService } from './sprint-backlog-item.service.service';

describe('SprintBacklogItemServiceService', () => {
  let service: SprintBacklogItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintBacklogItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
