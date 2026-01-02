import { Component } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-customer-list',
  template: `
    <h1>Customer Management</h1>
    <div class="card mt-4">
       <app-data-table [columns]="columns" [data]="customers"></app-data-table>
    </div>
  `
})
export class CustomerListComponent {
  columns: ColumnConfig[] = [
    { key: 'name', label: 'Customer' },
    { key: 'company', label: 'Company' },
    { key: 'status', label: 'Status', type: 'badge', badgeClassMap: { 'Active': 'badge-success', 'Inactive': 'badge-danger' } },
    { key: 'spent', label: 'Lifetime Value', type: 'currency' },
    { key: 'actions', label: 'Actions', type: 'action' }
  ];

  customers = [
    { id: 1, name: 'Alice Thompson', company: 'TechFlow Inc', status: 'Active', spent: 12500.50 },
    { id: 2, name: 'Mark Stevens', company: 'Global Solutions', status: 'Active', spent: 4500.00 },
    { id: 3, name: 'Elena Rodriguez', company: 'Creative Agency', status: 'Inactive', spent: 1200.00 },
  ];
}
