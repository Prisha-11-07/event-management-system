import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatButtonModule, MatSnackBarModule],
  template: `
    <mat-toolbar class="toolbar">
      <span class="brand">JDPA Events</span>

      <span class="spacer"></span>

      <a mat-button routerLink="/">Home</a>
      <a mat-button routerLink="/events">Events</a>

      <!-- ✅ bookings blocked if not logged in -->
      <button mat-button (click)="goBookings()">Bookings</button>

      <!-- ✅ toggle login/logout -->
      <a mat-button *ngIf="!auth.isLoggedIn()" routerLink="/login">Login</a>
      <button mat-button *ngIf="auth.isLoggedIn()" (click)="logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: [`
    .toolbar { background: #5b21b6; color: white; }
    .brand { font-weight: 700; font-size: 22px; }
    .spacer { flex: 1; }
    a, button { color: white !important; }
  `]
})
export class Navbar {
  constructor(
    public auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  goBookings() {
    if (!this.auth.isLoggedIn()) {
      this.snack.open('Please login to view bookings', 'Close', { duration: 2000 });
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/bookings']);
  }

  logout() {
    this.auth.logout();
    this.snack.open('Logged out ✅', 'Close', { duration: 1500 });
    this.router.navigate(['/login']);
  }
}