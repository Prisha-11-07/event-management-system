import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>JDPA Events Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (submit)="onLogin()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" [(ngModel)]="email" name="email" required>
            </mat-form-field>
            
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" [(ngModel)]="password" name="password" required>
            </mat-form-field>

            <button mat-raised-button color="primary" class="full-width" type="submit">
              Sign In
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: radial-gradient(circle, #30006b 0%, #000000 70%);
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
      border-top: 4px solid var(--accent-red);
    }
    .full-width { width: 100%; margin-bottom: 15px; }
    mat-card-title { margin-bottom: 20px; text-align: center; color: white; }
  `]
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    // Mock login - redirect to events
    if(this.email && this.password) {
      this.router.navigate(['/events']);
    }
  }
}