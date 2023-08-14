import { TestBed, async, inject } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { AuthGuardGuard } from './auth-guard.guard';

describe('AuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AuthGuardGuard]
    });
  });

  it('should ...', inject([AuthGuardGuard], (guard: AuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
