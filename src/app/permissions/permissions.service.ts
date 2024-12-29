import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from '../state/auth/auth.models';
import { selectUserRole } from '../state/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private store: Store<{ auth: AuthState }>) {}

  hasPermission(allowedRoles: string[]): Observable<boolean> {
    return this.store.select(selectUserRole).pipe(
      map((userRole) => allowedRoles.includes(userRole || ''))
    );
  }
}
