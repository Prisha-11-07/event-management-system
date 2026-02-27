import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../services/booking.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="title">My <span>Bookings</span></h1>

      <!-- Loading -->
      <p *ngIf="loading">Loading bookings...</p>

      <!-- Empty -->
      <p *ngIf="!loading && bookings.length === 0">
        No bookings found.
      </p>

      <!-- Booking list -->
      <ng-container *ngIf="!loading && bookings.length > 0">
        <div class="card" *ngFor="let booking of bookings">
          <p><b>Name:</b> {{ booking.name }}</p>
          <p><b>Email:</b> {{ booking.email }}</p>
          <p><b>Phone:</b> {{ booking.phone }}</p>
          <p><b>Tickets:</b> {{ booking.ticketCount }}</p>
          <p><b>Event ID:</b> {{ booking.eventId }}</p>

          <button (click)="cancelBooking(booking.id)">Cancel Booking</button>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .container {
      max-width: 900px;
      margin: 30px auto;
      color: white;
    }

    .title span {
      color: red;
    }

    .card {
      background: #1e1e1e;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
    }

    button {
      background: crimson;
      border: none;
      padding: 8px 12px;
      color: white;
      border-radius: 6px;
      cursor: pointer;
    }
  `]
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];
  loading = true;

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        console.log('Bookings received:', data);
        this.bookings = data ?? [];
        this.loading = false;
        this.cdr.detectChanges(); // prevents ExpressionChanged error
      },
      error: (err) => {
        console.error('Booking load error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelBooking(id: string | number | undefined) {
    if (!id) return;

    this.bookingService.cancelBooking(id).subscribe(() => {
      this.bookings = this.bookings.filter(b => b.id !== id);
    });
  }
}