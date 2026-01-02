import { Component } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/components/data-table/data-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  columns: ColumnConfig[] = [
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', type: 'badge', badgeClassMap: { 'ADMIN': 'badge-danger', 'USER': 'badge-success', 'MANAGER': 'badge-warning' } },
    { key: 'lastLogin', label: 'Last Login', type: 'date' },
    { key: 'actions', label: 'Actions', type: 'action' }
  ];

  users = [
    { id: 1, name: 'Admin One', email: 'admin@company.com', role: 'ADMIN', lastLogin: new Date() },
    { id: 2, name: 'Sarah Miller', email: 'sarah@company.com', role: 'MANAGER', lastLogin: new Date() },
    { id: 3, name: 'James Wilson', email: 'james@company.com', role: 'USER', lastLogin: new Date() },
  ];

  showForm = false;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', Validators.required],
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addUser() {
    if (this.userForm.invalid) return;

    const newUser = {
      id: this.users.length + 1,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      lastLogin: new Date(),
    };

    this.users.push(newUser);
    this.userForm.reset({ role: 'USER' });
    this.showForm = false;
  }
}
