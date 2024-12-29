import { AuthGuard } from './permissions/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { PermissionsGuard } from './permissions/permissions.guard';
import { Roles } from './state/roles/roles.enum';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { ComponentsComponent } from './pages/components/components.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'components', component: ComponentsComponent },
];



// export const routes: Routes = [
//   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'auth/login', component: LoginComponent },
//   {
//     path: 'user',
//     component: UserComponent,
//     canActivate: [AuthGuard, PermissionsGuard],
//     data: { requiredRoles: [Roles.ADMIN] },
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
