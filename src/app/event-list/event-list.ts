import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { EventService } from '../services/event.services';
import { EventItem } from '../models/event.model';

import { CategoryFilterPipe } from '../pipes/category-filter.pipe';
import { HighlightEventDirective } from '../directives/highlight-event.directive';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CategoryFilterPipe,
    HighlightEventDirective,
  ],
  template: `
  <div class="page-bg events-bg">
  <div class="content">
    <div class="wrap">
      <h1 class="title">Events</h1>

      <!-- Filter -->
      <div class="filter">
        <mat-form-field appearance="fill">
          <mat-label>Filter by Category</mat-label>
          <mat-select [(value)]="selectedCategory">
            <mat-option value="All">All</mat-option>

            <mat-option *ngFor="let c of (categories$ | async)" [value]="c">
              {{ c }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <ng-container *ngIf="events$ | async as events; else loadingTpl">
        <p *ngIf="events.length === 0">No events found.</p>

        <div class="grid" *ngIf="events.length > 0">
          <mat-card
            class="card"
            *ngFor="let event of (events | categoryFilter:selectedCategory)"
            [highlightEvent]="toNum(event.availableTickets)"
            [featured]="!!event.featured"
          >
            <img
              class="img"
              [src]="event.imageUrl || 'https://via.placeholder.com/900x350'"
              alt="Event image"
            />

            <mat-card-content>
              <div class="badge" *ngIf="event.featured">FEATURED</div>
              <div class="sold" *ngIf="toNum(event.availableTickets) === 0">SOLD OUT</div>

              <h2 class="name">{{ event.title }}</h2>
              <p class="meta">{{ event.date | date:'fullDate' }} • {{ event.location }}</p>

              <p class="meta">
                <b>Category:</b> {{ event.category }} |
                <b>Price:</b> {{ event.price | currency:'INR':'symbol':'1.0-0' }}
              </p>

              <p class="meta"><b>Tickets Left:</b> {{ event.availableTickets }}</p>

              <div class="actions">
                <a mat-raised-button color="primary" [routerLink]="['/event', event.id]">
                  View Details
                </a>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </ng-container>

      <ng-template #loadingTpl>
        <p>Loading events...</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .wrap { max-width: 1100px; margin: 20px auto; padding: 14px; color: white; }
    .title { font-size: 32px; margin: 10px 0 18px; }
    .filter { width: 320px; margin-bottom: 14px; }
    mat-form-field { width: 100%; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 16px;
    }

    .card { background: rgba(255, 255, 255, 0.05); border-radius: 14px; overflow: hidden; }
    .img { width: 100%; height: 170px; object-fit: cover; display: block; }
    .card {transition: transform 0.3s ease, box-shadow 0.3s ease;}
    .card:hover {transform: translateY(-6px);box-shadow: 0 8px 25px rgba(0,0,0,0.5);}

    .name { margin: 10px 0 6px; font-size: 20px; }
    .meta { margin: 4px 0; opacity: 0.9; }

    .actions { margin-top: 12px; }

    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background: #8b5cf6;
      font-size: 12px;
      font-weight: 700;
      margin-top: 10px;
    }

    .sold {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background: crimson;
      font-size: 12px;
      font-weight: 700;
      margin-top: 10px;
      margin-left: 8px;
    }
      .page-bg {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 40px 20px;
}

.content {
  max-width: 1200px;
  margin: auto;
  background: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 16px;
  backdrop-filter: blur(8px);
}

/* Events background */
.events-bg {
  background: linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
              url('https://tse4.mm.bing.net/th/id/OIP.8wfNNJv8cZCShQBQ5IEKNQHaE8?pid=Api&h=220&P=0');
}
              .page-bg {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
  .container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 30px;
}
  `],
})
export class EventList {
  selectedCategory = 'All';

  // ✅ declare only (no initialization here)
  events$!: Observable<EventItem[]>;
  categories$!: Observable<string[]>;

  constructor(private eventService: EventService) {
    // ✅ initialize AFTER DI is ready
    this.events$ = this.eventService.getEvents();

    this.categories$ = this.events$.pipe(
      map((events) => {
        const set = new Set<string>();
        (events ?? []).forEach((e) => {
          if (e.category) set.add(e.category);
        });
        return Array.from(set).sort();
      })
    );
  }

  toNum(value: any): number {
    return typeof value === 'number' ? value : Number(value);
  }
}