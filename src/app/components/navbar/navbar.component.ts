import * as AuthActions from '../../../app/state/auth/auth.actions';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthState } from '../../state/auth/auth.models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectAuth,
} from '../../../app/state/auth/auth.selectors';
import { PermissionService } from '../../permissions/permissions.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule, AsyncPipe, CommonModule],
})
export class NavbarComponent implements OnInit {
  menuItems: any[] = [];
  auth$: Observable<AuthState>;

  isMaintenanceMode: boolean = false;
  canAccessUser$: Observable<boolean> = new Observable<boolean>();

  constructor(private router: Router, private store: Store<{ counter: number }>,
    private permissionService: PermissionService
  ) {
    this.auth$ = this.store.select(selectAuth);
  }

  ngOnInit(): void {
    this.canAccessUser$ = this.permissionService.hasPermission(['ADMIN']);
  }


  get currentRouteIsAuth(): boolean {
    return this.router.url.includes('auth') ? true : false;
  }

  get userName(): string {
    let firstName = '';
    let lastName = '';
    this.auth$.subscribe(auth => {
      firstName = auth?.user?.firstName || '';
      lastName = auth?.user?.lastName || '';
    });
    return `${firstName} ${lastName}`;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  get logoutIcon(): string {
    return '/icons/icon_exit.svg';
  }

  get userIcon(): string {
    return '/icons/icon_user.svg';
  }
  get pipeIcon(): string {
    return '/icons/General/Other1.svg';
  }

  truncateName(): string {
    const oringinalName = this.userName;
    let name = oringinalName.substring(0, 10);
    if (oringinalName.length > 10) {
      name += '...';
    }
    return name;
  }

  async handleLogout(): Promise<void> {
    this.logout();
    this.router.navigate(['/auth/login']);
  }

  async loadData(): Promise<void> {}

  async checkMaintenanceMode(): Promise<void> {}
}
