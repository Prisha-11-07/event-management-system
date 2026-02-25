import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSnackBarModule],
  template: `
    <div class="container">
      <h2>My Bookings</h2>

      <p *ngIf="loading">Loading bookings...</p>

      <table mat-table [dataSource]="bookings" class="mat-elevation-z2" *ngIf="!loading">

        <ng-container matColumnDef="eventId">
          <th mat-header-cell *matHeaderCellDef> Event ID </th>
          <td mat-cell *matCellDef="let b"> {{ b.eventId }} </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let b"> {{ b.name }} </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let b"> {{ b.email }} </td>
        </ng-container>

        <ng-container matColumnDef="tickets">
          <th mat-header-cell *matHeaderCellDef> Tickets </th>
          <td mat-cell *matCellDef="let b"> {{ b.ticketCount }} </td>
        </ng-container>

        <ng-container matColumnDef="bookedAt">
          <th mat-header-cell *matHeaderCellDef> Booked At </th>
          <td mat-cell *matCellDef="let b"> {{ b.bookedAt | date:'short' }} </td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef> Action </th>
          <td mat-cell *matCellDef="let b">
            <button mat-raised-button color="warn" (click)="cancel(b.id)">Cancel</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="cols"></tr>
        <tr mat-row *matRowDef="let row; columns: cols;"></tr>
      </table>

      <p *ngIf="!loading && bookings.length === 0">No bookings yet.</p>
    </div>
  `,
  styles: [`
    .container { padding: 30px; max-width: 1000px; margin: 0 auto; }
    table { width: 100%; margin-top: 15px; }
  `]
})
export class Bookings implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  cols: string[] = ['eventId', 'name', 'email', 'tickets', 'bookedAt', 'action'];

  constructor(private bookingService: BookingService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load bookings', 'Close', { duration: 3000 });
      }
    });
  }

  cancel(id: number): void {
    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b.id !== id);
        this.snackBar.open('Booking cancelled', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Cancel failed', 'Close', { duration: 3000 });
      }
    });
  }
}