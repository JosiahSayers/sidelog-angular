import { TestBed } from '@angular/core/testing';

import { SidelogService } from './sidelog-angular.service';

describe('SidelogAngularService', () => {
  let service: SidelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidelogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
