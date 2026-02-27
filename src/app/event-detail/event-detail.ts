import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { EventService } from '../services/event.services';
import { BookingService } from '../services/booking.service';
import { EventItem } from '../models/event.model';
import { finalize } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <p *ngIf="loading">Loading...</p>
      <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>

      <mat-card *ngIf="!loading && event">
        <div class="image-wrapper">
          <img
            class="cover"
            [src]="event.imageUrl || 'https://via.placeholder.com/900x350'"
            alt="Event image"
          />
        </div>

        <mat-card-header>
          <mat-card-title>{{ event.title }}</mat-card-title>
          <mat-card-subtitle>
            {{ event.date | date:'fullDate' }} • {{ event.location }}
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="details">
            <p><strong>Category:</strong> {{ event.category }}</p>
            <p><strong>Description:</strong> {{ event.description }}</p>
            <p><strong>Price:</strong> {{ event.price | currency:'INR':'symbol':'1.0-0' }}</p>
            <p><strong>Tickets Left:</strong> {{ event.availableTickets }}</p>
          </div>

          <hr />
            <button mat-stroked-button color="primary" [routerLink]="['schedule']">
            View Schedule
            </button>
            <hr />

          <div class="booking-section">
            <h3>Book Your Tickets</h3>

            <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="fill">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="name" placeholder="John Doe" />
                <mat-error *ngIf="bookingForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" placeholder="user@example.com" />
                <mat-error *ngIf="bookingForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="bookingForm.get('email')?.hasError('email')">
                  Invalid email format
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Phone</mat-label>
                <input matInput formControlName="phone" placeholder="9876543210" />
                <mat-error *ngIf="bookingForm.get('phone')?.hasError('required')">
                  Phone number is required
                </mat-error>
                <mat-error *ngIf="bookingForm.get('phone')?.hasError('pattern')">
                  Enter a valid 10-digit phone number
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Number of Tickets</mat-label>
                <input matInput type="number" formControlName="ticketCount" min="1" max="5" />
                <mat-error *ngIf="bookingForm.get('ticketCount')?.hasError('required')">
                  Ticket count is required
                </mat-error>
                <mat-error *ngIf="bookingForm.get('ticketCount')?.hasError('min')">
                  At least 1 ticket required
                </mat-error>
                <mat-error *ngIf="bookingForm.get('ticketCount')?.hasError('max')">
                  Max 5 tickets allowed
                </mat-error>
              </mat-form-field>

              <div class="actions">
                <button
                  mat-raised-button
                  color="accent"
                  type="submit"
                  [disabled]="bookingForm.invalid || submitting || (toNum(event.availableTickets) === 0)"
                >
                  {{ submitting ? 'Booking...' : 'Confirm Booking' }}
                </button>

                <button mat-button type="button" routerLink="/events">Back</button>
              </div>

              <p class="soldout" *ngIf="toNum(event.availableTickets) === 0">
                This event is Sold Out.
              </p>
            </form>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container { max-width: 900px; margin: 20px auto; padding: 20px; color: white; }
    mat-card { background: #1e1e1e; }
    .image-wrapper { width: 100%; overflow: hidden; border-radius: 8px; }
    .cover { width: 100%; height: 320px; object-fit: cover; display: block; }
    .details p { margin: 6px 0; }
    mat-form-field { width: 100%; margin-bottom: 15px; }
    .booking-section { background: #2c2c2c; padding: 18px; border-radius: 8px; margin-top: 18px; }
    .actions { display: flex; gap: 12px; align-items: center; margin-top: 8px; }
    .error { color: #ff6b6b; margin-bottom: 10px; }
    .soldout { margin-top: 10px; color: #ffb3b3; }
  `]
})
export class EventDetail implements OnInit {
  event?: EventItem;

  bookingForm: FormGroup;
  loading = true;
  submitting = false;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private bookingService: BookingService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      ticketCount: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  console.log('Route id:', id);

  if (!id) {
    this.errorMsg = 'Invalid event id';
    this.loading = false;
    return;
  }

  this.eventService.getEventById(id).subscribe({
    next: (data: EventItem) => {
      console.log('Event detail received:', data);

      this.event = data;
      this.loading = false;

      this.cdr.detectChanges();   // ⭐ forces UI refresh
    },

    error: (err) => {
      console.log('Event detail error:', err);
      this.errorMsg = 'Failed to load event';
      this.loading = false;

      this.cdr.detectChanges();
    }
  });
}





  onSubmit(): void {
  if (!this.bookingForm.valid || !this.event) return;

  const requestedTickets = Number(this.bookingForm.value.ticketCount);

  // safety checks
  if (requestedTickets <= 0) return;
  if (this.event.availableTickets === 0) {
    this.snackBar.open('Sold Out', 'Close', { duration: 2500 });
    return;
  }
  if (requestedTickets > this.event.availableTickets) {
    this.snackBar.open('Not enough tickets available', 'Close', { duration: 3000 });
    return;
  }

  this.submitting = true;

  const bookingPayload = {
    eventId: this.event.id, // can be string|number in your db, json-server accepts it
    name: this.bookingForm.value.name,
    email: this.bookingForm.value.email,
    phone: this.bookingForm.value.phone,
    ticketCount: requestedTickets,
    bookedAt: new Date().toISOString()
  };

  this.bookingService.createBooking(bookingPayload).subscribe({
    next: () => {
      // ✅ reduce tickets in events table
      const newTickets = Number(this.event!.availableTickets) - requestedTickets;

      this.eventService.updateTickets(Number(this.event!.id), newTickets).subscribe({
        next: (updated) => {
          this.event = updated; // update UI instantly
          this.submitting = false;
          this.snackBar.open('Booking Confirmed!', 'Close', { duration: 3000 });
          this.router.navigate(['/bookings']); // optional: go to bookings page
        },
        error: () => {
          this.submitting = false;
          this.snackBar.open('Booked, but ticket update failed!', 'Close', { duration: 3000 });
          this.router.navigate(['/bookings']);
        }
      });
    },
    error: () => {
      this.submitting = false;
      this.snackBar.open('Booking failed. Please try again.', 'Close', { duration: 3000 });
    }
  });
}

  toNum(value: any): number {
    return typeof value === 'number' ? value : Number(value);
  }
}