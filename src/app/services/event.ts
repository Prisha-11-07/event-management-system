import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [
    {
      id: 1,
      title: 'Neon Cyber Night',
      date: '2026-03-15',
      category: 'Party',
      location: 'JDPA Arena, Bengaluru',
      price: 1200,
      description: 'A futuristic cyber-punk themed rave party.',
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=600&q=80',
      availableTickets: 100
    },
    {
      id: 2,
      title: 'Red Rock Festival',
      date: '2026-04-20',
      category: 'Music',
      location: 'Palace Grounds',
      price: 2500,
      description: 'Hard rock and metal showcase featuring top bands.',
      imageUrl: 'https://images.unsplash.com/photo-1459749411177-8c275d85d31e?auto=format&fit=crop&w=600&q=80',
      availableTickets: 0 
    },
    {
      id: 3,
      title: 'AI & Future Tech Summit',
      date: '2026-05-10',
      category: 'Tech',
      location: 'Tech Park Auditorium',
      price: 500,
      description: 'Explore the future of Artificial Intelligence.',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      availableTickets: 50
    },
    {
      id: 4,
      title: 'Midnight Jazz Club',
      date: '2026-06-12',
      category: 'Music',
      location: 'The Black Lounge',
      price: 800,
      description: 'Smooth jazz vibes all night long.',
      imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80',
      availableTickets: 20
    },
    {
      id: 5,
      title: 'Gaming Championship',
      date: '2026-07-01',
      category: 'Esports',
      location: 'Virtual Arena',
      price: 150,
      description: 'National level Valorant and CS2 tournament.',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      availableTickets: 200
    }
  ];

  private bookings: Booking[] = [];

  constructor() { }

  getEvents(): Observable<Event[]> {
    return of(this.events);
  }

  getEventById(id: number): Observable<Event | undefined> {
    const event = this.events.find(e => e.id === id);
    return of(event);
  }

  createBooking(booking: Booking): Observable<boolean> {
    this.bookings.push(booking);
    return of(true);
  }
}