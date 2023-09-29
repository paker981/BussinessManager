import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { workersListResolver } from './workers-list.resolver';

describe('workersListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => workersListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
