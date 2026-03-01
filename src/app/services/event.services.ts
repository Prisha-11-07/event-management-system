import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventItem } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {

  // ✅ base should be only host
  private apiBase = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // ✅ GET all events
  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.apiBase}/events`);
  }

  // ✅ GET event by id
  getEventById(id: number): Observable<EventItem> {
    return this.http.get<EventItem>(`${this.apiBase}/events/${id}`);
  }

  // ✅ update tickets
  updateTickets(id: number, availableTickets: number): Observable<EventItem> {
    return this.http.patch<EventItem>(
      `${this.apiBase}/events/${id}`,
      { availableTickets }
    );
  }
}