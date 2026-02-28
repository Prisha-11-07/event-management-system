import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { BookingService, Booking } from '../services/booking.service';
import { ConfirmDialog } from './confirm-dialog';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatSnackBarModule, MatButtonModule],
  template: `
  <div class="page-bg bookings-bg">
  <div class="content">
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

            <button mat-raised-button color="warn" (click)="confirmCancel(b.id)">
              Cancel Booking
            </button>
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
        margin-top: 10px;
      }
      .bookings-bg {
  min-height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),
              url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
              .page-bg {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
    `,
  ],
})
export class BookingsComponent {
  bookings$!: Observable<Booking[]>;

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    this.bookings$ = this.bookingService.getBookings();
  }

  confirmCancel(id: string | number | undefined) {
    if (id === undefined || id === null) return;

    const ref = this.dialog.open(ConfirmDialog, {
      width: '360px',
      data: { message: 'Are you sure you want to cancel this booking?' },
    });

    ref.afterClosed().subscribe((yes: boolean) => {
      if (!yes) return;

      this.bookingService.cancelBooking(id).subscribe({
        next: () => {
          this.snack.open('Booking cancelled ✅', 'Close', { duration: 2000 });
          this.bookings$ = this.bookingService.getBookings(); // reload
        },
        error: () => {
          this.snack.open('Cancel failed ❌', 'Close', { duration: 2000 });
        },
      });
    });
  }

  trackById(index: number, item: Booking) {
    return item.id ?? index;
  }
}