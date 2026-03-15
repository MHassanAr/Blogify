import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, AuthUser, Role } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:8000';

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  private roleSubject = new BehaviorSubject<Role | null>(null);
  role$ = this.roleSubject.asObservable();

  private userSubject = new BehaviorSubject<AuthUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    if (!this.isBrowser) return;

    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role') as Role | null;
    const userRaw = localStorage.getItem('user');

    this.tokenSubject.next(token);
    this.roleSubject.next(role);

    if (userRaw) {
      try {
        this.userSubject.next(JSON.parse(userRaw) as AuthUser);
      } catch {
        this.userSubject.next(null);
      }
    }
  }

  signup(userName: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { userName, email, password });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => this.persistAuth(res))
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    }

    this.tokenSubject.next(null);
    this.roleSubject.next(null);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  isAdmin(): boolean {
    return this.roleSubject.value === 'admin';
  }

  private persistAuth(res: AuthResponse) {

    if (this.isBrowser) {
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('user', JSON.stringify(res.user ?? null));
    }

    this.tokenSubject.next(res.access_token);
    this.roleSubject.next(res.role);
    this.userSubject.next(res.user ?? null);
  }

}