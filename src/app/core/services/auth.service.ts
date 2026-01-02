import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<User> {
    // Mock login logic
    const mockUser: User = {
      id: '1',
      email: email,
      name: 'Admin User',
      role: email.includes('admin') ? 'ADMIN' : 'USER'
    };

    return of(mockUser).pipe(
      delay(800),
      tap(user => {
        localStorage.setItem('auth_token', 'mock_jwt_token_123');
        localStorage.setItem('auth_user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('auth_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserRole(): string | null {
    return this.userSubject.value?.role || null;
  }
}
