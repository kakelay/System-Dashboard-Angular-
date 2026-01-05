import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ColumnConfig } from "src/app/shared/components/data-table/data-table.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent {
  columns: ColumnConfig[] = [
    { key: "name", label: "Full Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      type: "badge",
      badgeClassMap: {
        ADMIN: "badge-danger",
        USER: "badge-success",
        MANAGER: "badge-warning",
      },
    },
    {
      key: "status",
      label: "Status",
      type: "badge",
      badgeClassMap: { ACTIVE: "badge-success", INACTIVE: "badge-secondary" },
    },
    { key: "lastLogin", label: "Last Login", type: "date" },
    { key: "actions", label: "Actions", type: "action" },
  ];

  users = [
    {
      id: 1,
      name: "Admin One",
      email: "admin@company.com",
      role: "ADMIN",
      status: "ACTIVE",
      lastLogin: new Date(),
    },
    {
      id: 2,
      name: "Sarah Miller",
      email: "sarah@company.com",
      role: "MANAGER",
      status: "ACTIVE",
      lastLogin: new Date(Date.now() - 86400000),
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james@company.com",
      role: "USER",
      status: "ACTIVE",
      lastLogin: new Date(Date.now() - 172800000),
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@company.com",
      role: "USER",
      status: "INACTIVE",
      lastLogin: new Date(Date.now() - 604800000),
    },
  ];

  showForm = false;
  userForm: FormGroup;
  searchTerm: string = "";
  filteredUsers = this.users;
  userStats = {
    totalUsers: 4,
    activeUsers: 3,
    admins: 1,
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["USER", Validators.required],
      status: ["ACTIVE", Validators.required],
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.userForm.reset({ role: "USER", status: "ACTIVE" });
    }
  }

  addUser() {
    if (this.userForm.invalid) return;

    const newUser = {
      id: Math.max(...this.users.map((u) => u.id), 0) + 1,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      status: this.userForm.value.status,
      lastLogin: new Date(),
    };

    this.users.push(newUser);
    this.filteredUsers = this.users;
    this.updateStats();
    this.userForm.reset({ role: "USER", status: "ACTIVE" });
    this.showForm = false;
  }

  deleteUser(userId: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.users = this.users.filter((u) => u.id !== userId);
      this.filteredUsers = this.users;
      this.updateStats();
    }
  }

  editUser(user: any) {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    this.showForm = true;
  }

  searchUsers() {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      );
    }
  }

  updateStats() {
    this.userStats = {
      totalUsers: this.users.length,
      activeUsers: this.users.filter((u) => u.status === "ACTIVE").length,
      admins: this.users.filter((u) => u.role === "ADMIN").length,
    };
  }

  viewUserDetail(userId: number): void {
    this.router.navigate(["/users", userId]);
  }
}
