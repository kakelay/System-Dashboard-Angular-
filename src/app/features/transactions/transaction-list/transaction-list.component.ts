import { Component } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
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
