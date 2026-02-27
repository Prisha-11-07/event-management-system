import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { EventItem } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  // LIST
  getEvents(): Observable<EventItem[]> {
    console.log('Calling LIST API:', this.apiUrl);
    return this.http.get<EventItem[]>(this.apiUrl).pipe(
      tap((data) => console.log('Events received:', data))
    );
  }

  // DETAIL  /events/:id
  getEventById(id: number): Observable<EventItem> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Calling DETAIL API:', url);
    return this.http.get<EventItem>(url).pipe(
      tap((data) => console.log('Event detail received:', data))
    );
  }

  // PATCH tickets
  updateTickets(id: number, newAvailableTickets: number): Observable<EventItem> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<EventItem>(url, { availableTickets: newAvailableTickets });
  }
}