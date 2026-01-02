import { Component } from '@angular/core';

@Component({
  selector: 'app-role-list',
  template: `
    <div class="flex justify-between items-center mb-4">
      <h1>Roles & Permissions</h1>
      <button class="btn btn-primary">Create Role</button>
    </div>
    <div class="grid-3 mt-4">
      <div class="card" *ngFor="let role of roles">
        <div class="flex justify-between mb-4">
          <h3>{{ role.name }}</h3>
          <span class="badge badge-success">{{ role.users }} Users</span>
        </div>
        <p class="text-muted small mb-4">{{ role.description }}</p>
        <button class="btn btn-outline w-full">Edit Permissions</button>
      </div>
    </div>
  `,
  styles: [`
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .small { font-size: 0.875rem; }
    .w-full { width: 100%; }
  `]
})
export class RoleListComponent {
  roles = [
    { name: 'Administrator', users: 3, description: 'Full access to all system modules and settings.' },
    { name: 'Manager', users: 8, description: 'Can manage customers and transactions but cannot edit roles.' },
    { name: 'Viewer', users: 15, description: 'Read-only access to reports and dashboard.' }
  ];
}
