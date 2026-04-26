import { Component } from "@angular/core";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  isProduction = environment.production;

  stats = [
    { label: "Total Users", value: "12,540", icon: "people", color: "blue" },
    {
      label: "Active Subscriptions",
      value: "8,320",
      icon: "check_circle",
      color: "green",
    },
    {
      label: "Revenue (MTD)",
      value: "$45,210",
      icon: "payments",
      color: "purple",
    },
    {
      label: "System Health",
      value: "99.9%",
      icon: "settings_suggest",
      color: "orange",
    },
  ];
  recentTransactions: any[] = [];
}
