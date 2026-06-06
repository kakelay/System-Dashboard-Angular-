import { Component, OnInit } from "@angular/core";
import {
  NotificationService,
  Notification,
} from "src/app/core/services/notification.service";

@Component({
  selector: "app-notification-container",
  templateUrl: "./notification-container.component.html",
  styleUrls: ["./notification-container.component.scss"],
})
export class NotificationContainerComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  removeNotification(id: string): void {
    this.notificationService.remove(id);
  }

  getIcon(type: string): string {
    const icons: { [key: string]: string } = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ",
    };
    return icons[type] || "ℹ";
  }
}
