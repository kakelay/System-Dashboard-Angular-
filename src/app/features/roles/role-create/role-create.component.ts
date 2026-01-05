import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-role-create",
  templateUrl: "./role-create.component.html",
  styleUrls: ["./role-create.component.scss"],
})
export class RoleCreateComponent {
  roleForm: FormGroup;
  selectedPermissions: string[] = [];

  availablePermissions = [
    { id: 1, name: "Dashboard", category: "View" },
    { id: 2, name: "Users Management", category: "Manage" },
    { id: 3, name: "Roles Management", category: "Manage" },
    { id: 4, name: "Transactions", category: "View" },
    { id: 5, name: "Reports", category: "View" },
    { id: 6, name: "Settings", category: "Manage" },
    { id: 7, name: "Audit Log", category: "View" },
    { id: 8, name: "Customer Management", category: "Manage" },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.roleForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      permissions: [[], Validators.required],
    });
  }

  togglePermission(permissionName: string): void {
    const index = this.selectedPermissions.indexOf(permissionName);
    if (index > -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(permissionName);
    }
    this.roleForm.patchValue({ permissions: this.selectedPermissions });
  }

  isPermissionSelected(permissionName: string): boolean {
    return this.selectedPermissions.includes(permissionName);
  }

  createRole(): void {
    if (this.roleForm.invalid) {
      alert(
        "Please fill in all required fields and select at least one permission"
      );
      return;
    }

    const newRole = {
      name: this.roleForm.value.name,
      description: this.roleForm.value.description,
      permissions: this.selectedPermissions,
    };

    console.log("Creating new role:", newRole);
    alert("Role created successfully!");
    this.router.navigate(["/roles"]);
  }

  cancel(): void {
    this.router.navigate(["/roles"]);
  }
}
