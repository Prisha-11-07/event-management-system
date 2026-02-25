import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventService } from '../services/event';
import { Event } from '../models/event';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <div class="container" *ngIf="event">
      <div class="header">
        <h1>{{ event.title }}</h1>
        <p>{{ event.date | date:'fullDate' }}</p>
      </div>

      <div class="details">
        <p><strong>Location:</strong> {{ event.location }}</p>
        <p><strong>Description:</strong> {{ event.description }}</p>
        <p><strong>Price:</strong> {{ event.price | currency:'INR' }}</p>
        <p><strong>Tickets Left:</strong> {{ event.availableTickets }}</p>
      </div>

      <hr>

      <div class="booking-section">
        <h3>Book Your Tickets</h3>
        <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
          
          <mat-form-field appearance="fill">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="userName" placeholder="John Doe">
            <mat-error *ngIf="bookingForm.get('userName')?.hasError('required')">Name is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput formControlName="userEmail" placeholder="user@example.com">
            <mat-error *ngIf="bookingForm.get('userEmail')?.hasError('email')">Invalid email format</mat-error>
            <mat-error *ngIf="bookingForm.get('userEmail')?.hasError('required')">Email is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Number of Tickets</mat-label>
            <input matInput type="number" formControlName="ticketCount" min="1" max="5">
            <mat-error *ngIf="bookingForm.get('ticketCount')?.hasError('min')">At least 1 ticket required</mat-error>
            <mat-error *ngIf="bookingForm.get('ticketCount')?.hasError('max')">Max 5 tickets allowed</mat-error>
          </mat-form-field>

          <button mat-raised-button color="accent" type="submit" [disabled]="bookingForm.invalid || event.availableTickets === 0">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 20px auto; padding: 20px; background: #1e1e1e; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.5); color: white; }
    mat-form-field { width: 100%; margin-bottom: 15px; }
    .booking-section { background: #2c2c2c; padding: 20px; border-radius: 8px; margin-top: 20px; }
  `]
})
export class EventDetail implements OnInit {
  event: Event | undefined;
  bookingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.bookingForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      ticketCount: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(id).subscribe((data: Event | undefined) => {
      this.event = data;
    });
  }

  onSubmit() {
    if (this.bookingForm.valid && this.event) {
      const bookingData = {
        eventId: this.event.id,
        ...this.bookingForm.value,
        date: new Date()
      };
      
      this.eventService.createBooking(bookingData).subscribe((success: boolean) => {
        this.snackBar.open('Booking Confirmed!', 'Close', { duration: 3000 });
        this.router.navigate(['/events']);
      });
    }
  }
}