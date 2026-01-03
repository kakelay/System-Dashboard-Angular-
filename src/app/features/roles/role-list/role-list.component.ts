import { Component } from "@angular/core";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.scss"],
})
export class RoleListComponent {
  roles = [
    {
      name: "Administrator",
      users: 3,
      description: "Full access to all system modules and settings.",
    },
    {
      name: "Manager",
      users: 8,
      description:
        "Can manage customers and transactions but cannot edit roles.",
    },
    {
      name: "Viewer",
      users: 15,
      description: "Read-only access to reports and dashboard.",
    },
  ];
}
