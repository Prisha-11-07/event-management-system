import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { EventList } from './event-list/event-list';
import { EventDetail } from './event-detail/event-detail';
import { BookingsComponent } from './bookings/bookings';

import { authGuard } from './guards/auth.guard';
import { EventScheduleComponent } from './event-schedule/event-schedule';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'events', component: EventList },

  // ✅ Event detail
  { path: 'event/:id', component: EventDetail },

  // ✅ Schedule page (simple nested URL)
  { path: 'event/:id/schedule', component: EventScheduleComponent },

  // ✅ protected bookings
  { path: 'bookings', component: BookingsComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' },
];