import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id?: string | number;     // ✅ supports JSON Server id as string or number
  eventId: string | number; // ✅ your db shows eventId as "1" (string)
  name: string;
  email: string;
  phone: string;
  ticketCount: number;
  bookedAt: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly apiUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  createBooking(payload: Omit<Booking, 'id'>): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, payload);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  // ✅ delete booking (cancel)
  cancelBooking(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ alias: some files call deleteBooking()
  deleteBooking(id: string | number): Observable<void> {
    return this.cancelBooking(id);
  }
}