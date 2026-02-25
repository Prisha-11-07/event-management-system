import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event';
import { Event } from '../models/event';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, RouterLink],
  template: `
    <div class="container">
      <h2 class="page-title">Upcoming <span class="red-text">Events</span></h2>
      <div class="grid">
        <mat-card *ngFor="let event of events" class="event-card">
          <div class="image-wrapper">
             <img [src]="event.imageUrl" alt="Event image">
             <div class="price-tag">{{ event.price | currency:'INR':'symbol':'1.0-0' }}</div>
          </div>
          <mat-card-header>
            <mat-card-title>{{ event.title }}</mat-card-title>
            <mat-card-subtitle class="custom-subtitle">{{ event.date | date }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ event.description }}</p>
            <mat-chip-listbox>
                <mat-chip color="accent" selected>{{ event.category }}</mat-chip>
            </mat-chip-listbox>
          </mat-card-content>
          <mat-card-actions align="end">
             <button *ngIf="event.availableTickets === 0" mat-raised-button disabled>Sold Out</button>
             <button *ngIf="event.availableTickets > 0" mat-raised-button color="primary" [routerLink]="['/event', event.id]">Book Now</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 40px; max-width: 1200px; margin: 0 auto; }
    .page-title { font-size: 2.5rem; margin-bottom: 30px; border-left: 5px solid #6200ea; padding-left: 15px; }
    .red-text { color: #d50000; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
    .event-card { transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; background-color: #1e1e1e; color: white; }
    .event-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(98, 0, 234, 0.4); border-color: #6200ea; }
    .image-wrapper { position: relative; height: 200px; overflow: hidden; }
    .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
    .price-tag { position: absolute; top: 10px; right: 10px; background: #d50000; color: white; padding: 5px 10px; font-weight: bold; border-radius: 4px; }
    .custom-subtitle { color: #aaa !important; margin-top: 5px; }
    mat-card-content { margin-top: 15px; min-height: 80px; }
  `]
})
export class EventList implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }
}