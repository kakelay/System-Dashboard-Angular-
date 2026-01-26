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

  recentTransactions = [
    {
      id: "TX-1001",
      customer: "John Doe",
      amount: 150.0,
      status: "Success",
      date: new Date(),
    },
    {
      id: "TX-1002",
      customer: "Jane Smith",
      amount: 85.5,
      status: "Pending",
      date: new Date(),
    },
    {
      id: "TX-1003",
      customer: "Robert Brown",
      amount: 210.0,
      status: "Failed",
      date: new Date(),
    },
    {
      id: "TX-1004",
      customer: "Emily Davis",
      amount: 95.75,
      status: "Success",
      date: new Date(),
    },
  ];
}
