import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BookingService, Booking } from '../services/booking.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="title">My <span>Bookings</span></h1>

      <ng-container *ngIf="bookings$ | async as bookings; else loadingTpl">
        <h2 class="count">Total: {{ bookings.length }}</h2>

        <p *ngIf="bookings.length === 0">No bookings found.</p>

        <ng-container *ngIf="bookings.length > 0">
          <div class="card" *ngFor="let b of bookings; trackBy: trackById">
            <p><b>Name:</b> {{ b.name }}</p>
            <p><b>Email:</b> {{ b.email }}</p>
            <p><b>Phone:</b> {{ b.phone }}</p>
            <p><b>Tickets:</b> {{ b.ticketCount }}</p>
            <p><b>Event:</b> {{ b.eventTitle || ('Event #' + b.eventId) }}</p>
            <p *ngIf="b.bookedAt"><b>Booked At:</b> {{ b.bookedAt | date:'medium' }}</p>

            <button (click)="cancelBooking(b.id)">Cancel Booking</button>
          </div>
        </ng-container>
      </ng-container>

      <ng-template #loadingTpl>
        <p>Loading...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 900px;
        margin: 30px auto;
        color: white;
      }
      .title span {
        color: red;
      }
      .count {
        margin-top: 10px;
        font-weight: 600;
      }
      .card {
        background: #1e1e1e;
        padding: 18px;
        margin-bottom: 15px;
        border-radius: 12px;
      }
      button {
        background: crimson;
        border: none;
        padding: 10px 14px;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 10px;
      }
    `,
  ],
})
export class BookingsComponent {
  bookings$!: Observable<Booking[]>; // ✅ declare first

  constructor(private bookingService: BookingService) {
    // ✅ initialize AFTER service exists
    this.bookings$ = this.bookingService.getBookings();
  }

  cancelBooking(id: string | number | undefined) {
    if (id === undefined || id === null) return;

    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        alert('Booking cancelled ✅');
        // ✅ reload list after cancel
        this.bookings$ = this.bookingService.getBookings();
      },
      error: (err) => console.error('Cancel error:', err),
    });
  }

  trackById(index: number, item: Booking) {
    return item.id ?? index;
  }
}