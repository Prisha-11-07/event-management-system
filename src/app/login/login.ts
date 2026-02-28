import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  template: `
  <div class="page-bg login-bg">
  <div class="login-wrapper">
    <div class="container">
      <mat-card class="card">
        <h2>JDPA Events Login</h2>

        <form [formGroup]="form" (ngSubmit)="onLogin()">
          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" />
            <mat-error *ngIf="form.get('email')?.invalid">Enter valid email</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" />
            <mat-error *ngIf="form.get('password')?.invalid">Password required</mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            Sign In
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .container { max-width: 520px; margin: 50px auto; padding: 20px; color: white; }
    .card { padding: 22px; background: #1e1e1e; color: white; border-radius: 14px; }
    button { width: 100%; margin-top: 10px; }
    mat-form-field { width: 100%; margin-bottom: 14px; }
    .login-bg {
  min-height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)),
              url('https://tse2.mm.bing.net/th/id/OIP.33KG6ZKmIA7JFCHhFQvezQHaE8?pid=Api&h=220&P=0');
  background-size: cover;
  background-position: center;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
  .page-bg {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
  `]
})
export class Login {

  form!: FormGroup;   // ⭐ declare only

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    // ⭐ initialize AFTER fb is available
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.form.invalid) return;

    this.auth.login();

    this.snack.open('Login successful ✅', 'Close', { duration: 2000 });

    this.router.navigate(['/events']);
  }
}