import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USER" | "MANAGER";
  name: string;
}

interface AuthResponse {
  data?: {
    accessToken?: string;
    tokenType?: string;
  };
  accessToken?: string;
  responseCode?: string;
  status?: string;
  message?: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly tokenStorageKey = "auth_token";
  private readonly userStorageKey = "auth_user";
  private userSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage(),
  );
  public user$ = this.userSubject.asObservable();

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
  ) {}

  login(username: string, password: string): Observable<string> {
    return this.authenticate(username, password).pipe(
      tap(() => {
        const user: User = {
          id: "1",
          email: username,
          name: username,
          role: "ADMIN",
        };

        localStorage.setItem(this.userStorageKey, JSON.stringify(user));
        this.userSubject.next(user);
      }),
    );
  }

  authenticate(
    username: string = environment.authUsername,
    password: string = environment.authPassword,
  ): Observable<string> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      apiKey: environment.authApiKey,
      partnerid: environment.authPartnerId,
      header: environment.authHeader,
    });

    const payload = {
      username,
      password,
    };

    return this.http
      .post<AuthResponse>(environment.authApiUrl, payload, { headers })
      .pipe(
        map((response) => {
          const token = response?.data?.accessToken || response?.accessToken;

          if (!token) {
            throw new Error(response?.message || "Unable to authenticate");
          }

          localStorage.setItem(this.tokenStorageKey, token);
          return token;
        }),
        catchError((error) => {
          this.clearAuthData();
          return throwError(() => error);
        }),
      );
  }

  getOrRefreshToken(forceRefresh = false): Observable<string> {
    const token = this.getToken();

    if (token && !forceRefresh) {
      return of(token);
    }

    return this.authenticate();
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(["/auth/login"]);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.userStorageKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.userStorageKey);
    this.userSubject.next(null);
  }

  getUserRole(): string | null {
    return this.userSubject.value?.role || null;
  }
}
