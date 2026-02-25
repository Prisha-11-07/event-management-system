import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { EventList } from './event-list/event-list';
import { EventDetail } from './event-detail/event-detail';

export const routes: Routes = [
    { path: '', component: Home },           // Landing Page
    { path: 'login', component: Login },     // Login Page
    { path: 'events', component: EventList },// Events Grid
    { path: 'event/:id', component: EventDetail }, // Detail
    { path: '**', redirectTo: '' }
];