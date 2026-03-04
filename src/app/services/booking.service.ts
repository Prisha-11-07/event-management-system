import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id?: string | number;     // JSON Server id can be string/number
  eventId: string | number; // your db shows eventId as "1"
  eventTitle?: string;      // ✅ NEW: store event title

  name: string;
  email: string;
  phone: string;
  ticketCount: number;
  bookedAt: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly apiUrl = 'https://event-management-system-lpb0.onrender.com/bookings';

  constructor(private http: HttpClient) {}

  createBooking(payload: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, payload);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  // cancel booking
  cancelBooking(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // alias if any file calls deleteBooking()
  deleteBooking(id: string | number): Observable<void> {
    return this.cancelBooking(id);
  }
}