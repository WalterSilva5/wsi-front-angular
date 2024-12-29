import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AsyncPipe, CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterModule, Router } from '@angular/router';
import { AuthApiService } from '../provider/auth-api.service';
import { Observable } from 'rxjs';
import { AppState } from '../../../state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../app/state/auth/auth.actions';
import {
  selectAuth,
} from '../../../../app/state/auth/auth.selectors';
import { AuthState } from '../../../state/auth/auth.models';
import { AuthApiHandler } from '../data-handler/auth-api.handler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SweetAlert2Module,
    CommonModule,
    RouterModule,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  passwordFieldType: string = 'password';
  auth$: Observable<AuthState>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private api: AuthApiHandler,
    private router: Router
  ) {
    this.auth$ = this.store.select(selectAuth);
  }
  valueToIncrement: number = 5;

  updateAuthData(): void {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      const authResponse = await this.api.login({ email, password });
      if (authResponse?.accessToken) {
        this.store.dispatch(AuthActions.loginSuccess({ auth: authResponse }));
        Swal.fire({
          title: 'Carregando...',
          timer: 500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.router.navigate(['/home']);
      } else {
        this.showAlert('Usuário ou senha inválidos');
      }
    }
  }

  get openEyeIconPath(): string {
    return '/icons/General/Visible.svg';
  }

  get closeEyeIconPath(): string {
    return '/icons/General/Hidden.svg';
  }

  showAlert(message: string): void {
    Swal.fire({
      title: 'Alerta',
      html: `<p>${message}</p>`,
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
