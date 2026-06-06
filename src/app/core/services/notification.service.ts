import { Injectable, ComponentRef, ViewContainerRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  public notifications = this.notifications$.asObservable();

  private notificationCounter = 0;

  show(
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
    duration = 5000,
  ): void {
    const id = `notification-${this.notificationCounter++}`;
    const notification: Notification = {
      id,
      message,
      type,
      duration,
    };

    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  success(message: string, duration = 5000): void {
    this.show(message, "success", duration);
  }

  error(message: string, duration = 5000): void {
    this.show(message, "error", duration);
  }

  warning(message: string, duration = 5000): void {
    this.show(message, "warning", duration);
  }

  info(message: string, duration = 5000): void {
    this.show(message, "info", duration);
  }

  remove(id: string): void {
    const current = this.notifications$.value;
    this.notifications$.next(current.filter((n) => n.id !== id));
  }

  clearAll(): void {
    this.notifications$.next([]);
  }
}
