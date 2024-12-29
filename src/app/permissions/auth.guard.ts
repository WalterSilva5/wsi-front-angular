import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from '../state/auth/auth.models';
import { selectAuthState } from '../state/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectAuthState).pipe(
      map((authState: AuthState) => {
        if (authState.isAuthenticated) {
          return true;
        } else {
          console.log('Not authenticated');
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}
