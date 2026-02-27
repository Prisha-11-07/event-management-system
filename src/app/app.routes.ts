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

  // ✅ parent route + child route
  {
    path: 'event/:id',
    component: EventDetail,
    children: [
      { path: 'schedule', component: EventScheduleComponent },
    ],
  },

  // ✅ protected route
  { path: 'bookings', component: BookingsComponent, canActivate: [authGuard] },

  // ✅ wildcard last
  { path: '**', redirectTo: '' },
];