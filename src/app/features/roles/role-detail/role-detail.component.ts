import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-role-detail",
  templateUrl: "./role-detail.component.html",
  styleUrls: ["./role-detail.component.scss"],
})
export class RoleDetailComponent implements OnInit {
  roleId: string | null = null;
  roleData = {
    name: "Administrator",
    description: "Full access to all system modules and settings.",
    permissions: [
      { name: "Dashboard", granted: true },
      { name: "Users Management", granted: true },
      { name: "Roles Management", granted: true },
      { name: "Transactions", granted: true },
      { name: "Reports", granted: true },
      { name: "Settings", granted: true },
    ],
  };

  subRoles = [
    { id: 1, name: "Super Admin", assigned: true },
    { id: 2, name: "Admin", assigned: false },
    { id: 3, name: "Manager", assigned: false },
    { id: 4, name: "Support", assigned: false },
  ];

  isAdmin: boolean = true; // Check if current user is admin

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roleId = params.get("id");
      // Load role data based on ID
      if (this.roleId) {
        this.loadRoleData(this.roleId);
      }
    });
  }

  loadRoleData(roleId: string): void {
    // Call API to load role data
    console.log("Loading role data for:", roleId);
  }

  toggleSubRoleAssignment(subRole: any): void {
    if (this.isAdmin) {
      subRole.assigned = !subRole.assigned;
    }
  }

  togglePermission(permission: any): void {
    permission.granted = !permission.granted;
  }

  saveChanges(): void {
    const assignedSubRoles = this.subRoles
      .filter((sr) => sr.assigned)
      .map((sr) => sr.name);

    console.log("Saving changes", {
      role: this.roleData.name,
      subRoles: assignedSubRoles,
      permissions: this.roleData.permissions,
    });

    alert("Role updated successfully!");
    this.router.navigate(["/roles"]);
  }

  cancel(): void {
    this.router.navigate(["/roles"]);
  }
}
