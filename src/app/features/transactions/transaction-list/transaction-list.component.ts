import { Component } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-transaction-list',
  template: `
    <h1>Financial Transactions</h1>
    <div class="card mt-4">
       <div class="flex justify-between mb-4">
         <div class="flex gap-2">
            <select class="form-select"><option>All Status</option><option>Success</option><option>Failed</option></select>
            <input type="date" class="form-input">
         </div>
         <button class="btn btn-outline">Export CSV</button>
       </div>
       <app-data-table [columns]="columns" [data]="transactions"></app-data-table>
    </div>
  `,
  styles: [`
    .gap-2 { gap: 0.5rem; }
    .form-select, .form-input { padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 0.375rem; }
  `]
})
export class TransactionListComponent {
  columns: ColumnConfig[] = [
    { key: 'id', label: 'TX ID' },
    { key: 'amount', label: 'Amount', type: 'currency' },
    { key: 'status', label: 'Status', type: 'badge', badgeClassMap: { 'Success': 'badge-success', 'Pending': 'badge-warning', 'Failed': 'badge-danger' } },
    { key: 'date', label: 'Date', type: 'date' }
  ];

  transactions = [
    { id: 'TX-9981', amount: 500.00, status: 'Success', date: '2023-10-01' },
    { id: 'TX-9982', amount: 45.00, status: 'Failed', date: '2023-10-02' },
    { id: 'TX-9983', amount: 1250.75, status: 'Pending', date: '2023-10-03' },
  ];
}
