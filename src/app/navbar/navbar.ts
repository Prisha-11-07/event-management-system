import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive],
  template: `
    <mat-toolbar color="primary">
      <span class="brand" routerLink="/">JDPA Events</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</button>
      <button mat-button routerLink="/events" routerLinkActive="active">Events</button>
      <button mat-button routerLink="/login" routerLinkActive="active">Login</button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .brand { font-weight: bold; font-size: 1.4rem; cursor: pointer; letter-spacing: 1px; }
    .active { background: rgba(255,255,255,0.1); border-bottom: 2px solid var(--accent-red); }
  `]
})
export class Navbar {}