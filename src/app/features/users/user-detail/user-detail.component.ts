import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"],
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  isEditMode = false;
  userForm: FormGroup;

  userData = {
    id: 1,
    name: "Admin One",
    email: "admin@company.com",
    role: "ADMIN",
    status: "ACTIVE",
    lastLogin: new Date(),
    phone: "+1 (555) 123-4567",
    department: "IT",
    joinDate: new Date(2020, 0, 15),
    permissions: [
      { name: "Dashboard", granted: true },
      { name: "Users Management", granted: true },
      { name: "Roles Management", granted: true },
      { name: "Transactions", granted: true },
      { name: "Reports", granted: true },
      { name: "Settings", granted: true },
    ],
  };

  availableRoles = ["ADMIN", "MANAGER", "USER"];
  availableStatuses = ["ACTIVE", "INACTIVE"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      role: ["", Validators.required],
      status: ["", Validators.required],
      department: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get("id");
      if (this.userId) {
        this.loadUserData(this.userId);
      }
    });
  }

  loadUserData(userId: string): void {
    // Call API to load user data
    console.log("Loading user data for:", userId);
    this.populateForm();
  }

  populateForm(): void {
    this.userForm.patchValue({
      name: this.userData.name,
      email: this.userData.email,
      phone: this.userData.phone,
      role: this.userData.role,
      status: this.userData.status,
      department: this.userData.department,
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.populateForm();
    } else {
      this.userForm.reset();
    }
  }

  togglePermission(permission: any): void {
    permission.granted = !permission.granted;
  }

  saveChanges(): void {
    if (this.userForm.invalid) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedUser = {
      ...this.userData,
      ...this.userForm.value,
    };

    console.log("Saving user changes:", updatedUser);
    alert("User updated successfully!");
    this.isEditMode = false;
    this.userData = updatedUser;
  }

  deleteUser(): void {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      console.log("Deleting user:", this.userId);
      alert("User deleted successfully!");
      this.router.navigate(["/users"]);
    }
  }

  cancel(): void {
    this.isEditMode = false;
    this.userForm.reset();
    this.router.navigate(["/users"]);
  }
}
