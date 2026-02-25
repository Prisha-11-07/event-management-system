import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventItem } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<EventItem> {
    return this.http.get<EventItem>(`${this.apiUrl}/${id}`);
  }
}