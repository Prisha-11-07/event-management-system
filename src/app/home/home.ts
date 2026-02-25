import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="hero">
      <div class="content">
        <h1>Welcome to <span class="highlight">JDPA</span> Events</h1>
        <p>Experience the night. Live the moment. Book the best events in the city.</p>
        <div class="actions">
          <button mat-raised-button color="accent" routerLink="/events">Explore Events</button>
          <button mat-stroked-button color="primary" routerLink="/login">Login</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      height: 90vh;
      background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80');
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .content { max-width: 800px; padding: 20px; }
    h1 { font-size: 4rem; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
    .highlight { color: var(--primary-purple); text-shadow: 0 0 10px rgba(98,0,234,0.8); }
    p { font-size: 1.5rem; color: #ccc; margin-bottom: 40px; }
    .actions button { margin: 0 10px; padding: 25px 40px; font-size: 1.2rem; }
  `]
})
export class Home {}