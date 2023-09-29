import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { panelDataResolver } from './panel-data.resolver';

describe('panelDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => panelDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
