import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthGuard', () => {

  let mockRouter: any;
  class MockRouter {
    //noinspection TypeScriptUnresolvedFunction
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: mockRouter }],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
