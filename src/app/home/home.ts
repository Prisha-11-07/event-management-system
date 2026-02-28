import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="hero">
  <div>
    <h1>
      WELCOME TO <span>JDPA EVENTS</span>
    </h1>

    <p>
      Experience the night. Live the moment. Book the best events in the city.
    </p>

    <button mat-raised-button color="warn" routerLink="/events">
      Explore Events
    </button>
  </div>
</div>
  `,
  styles: [`
    .hero {
  height: 90vh;
  background: linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
              url('https://images.unsplash.com/photo-1506157786151-b8491531f063') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

.hero h1 {
  font-size: 64px;
  font-weight: 800;
  letter-spacing: 2px;
  line-height: 1.2;   /* ⭐ prevents overlap */
  margin-bottom: 20px;
}

.hero h1 span {
  color: #8b5cf6;
}

.hero p {
  font-size: 20px;
  opacity: 0.85;
  margin-bottom: 30px;
}
  `]
})
export class Home {}