import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { EventList } from './event-list/event-list';
import { EventDetail } from './event-detail/event-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'events', component: EventList },
  { path: 'event/:id', component: EventDetail },

  // ✅ Bookings page (lazy load standalone component)
  {
    path: 'bookings',
    loadComponent: () =>
      import('./bookings/bookings').then((m) => m.BookingsComponent),
  },

  { path: '**', redirectTo: '' },
];