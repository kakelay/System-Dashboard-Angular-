import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.scss"],
})
export class RoleListComponent {
  roles = [
    {
      id: 1,
      name: "Administrator",
      users: 3,
      description: "Full access to all system modules and settings.",
    },
    {
      id: 2,
      name: "Manager",
      users: 8,
      description:
        "Can manage customers and transactions but cannot edit roles.",
    },
    {
      id: 3,
      name: "Viewer",
      users: 15,
      description: "Read-only access to reports and dashboard.",
    },
  ];

  constructor(private router: Router) {}

  createRole(): void {
    this.router.navigate(["/roles/create"]);
  }

  editRole(roleId: number): void {
    this.router.navigate(["/roles", roleId]);
  }
}
