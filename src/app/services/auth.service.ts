import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'ems_logged_in';

  isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY) === 'true';
  }

  login(): void {
    localStorage.setItem(this.KEY, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
  }
}