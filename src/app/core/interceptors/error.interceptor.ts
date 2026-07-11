import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const isAuthFailure =
          error.status === 401 &&
          (error.error?.responseCode === "AUTH001" ||
            error.error?.message?.toLowerCase().includes("bearer token") ||
            error.error?.message?.toLowerCase().includes("token"));

        if (isAuthFailure) {
          return this.authService.getOrRefreshToken(true).pipe(
            switchMap((token) => {
              const retriedRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });

              return next.handle(retriedRequest);
            }),
            catchError((refreshError) => {
              this.authService.logout();
              return throwError(() => refreshError);
            }),
          );
        }

        if (error.status === 401) {
          this.authService.logout();
        }

        const err = error.error?.message || error.statusText || "Unauthorized";
        return throwError(() => new Error(err));
      }),
    );
  }
}
