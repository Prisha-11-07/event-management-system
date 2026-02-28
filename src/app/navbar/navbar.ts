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
      <span class="brand">
  JDPA <span class="accent">EVENTS</span>
</span>

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
    .toolbar {
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
    .brand {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 2.5s ease-in-out infinite alternate;
}

.accent {
  font-weight: 900;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px rgba(139, 92, 246, 0.4);
  }
  to {
    text-shadow: 0 0 15px rgba(236, 72, 153, 0.6);
  }
}
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