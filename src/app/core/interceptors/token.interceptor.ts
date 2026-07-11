import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.isAuthRequest(request)) {
      return next.handle(request);
    }

    return this.authService.getOrRefreshToken().pipe(
      switchMap((token) => {
        const authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next.handle(authRequest);
      }),
      catchError((error) => throwError(() => error)),
    );
  }

  private isAuthRequest(request: HttpRequest<unknown>): boolean {
    return (
      request.url.includes("/auth/sign-in") || request.url.includes("/auth/")
    );
  }
}
