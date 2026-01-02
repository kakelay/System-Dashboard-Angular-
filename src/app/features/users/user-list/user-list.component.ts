import { Component } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1>User Management</h1>
        <p>Manage back-office users and their access levels.</p>
      </div>
      <button class="btn btn-primary">Add New User</button>
    </div>
    <div class="card">
      <app-data-table [columns]="columns" [data]="users"></app-data-table>
    </div>
  `
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
}
