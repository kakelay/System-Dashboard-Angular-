import { Component } from '@angular/core';
import { ColumnConfig } from 'src/app/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent {
  columns: ColumnConfig[] = [
    { key: 'timestamp', label: 'Time', type: 'date' },
    { key: 'user', label: 'User' },
    { key: 'action', label: 'Action' },
    { key: 'target', label: 'Target' }
  ];

  logs = [
    { timestamp: new Date(), user: 'admin@company.com', action: 'Update Role', target: 'Manager Permissions' },
    { timestamp: new Date(), user: 'admin@company.com', action: 'Delete User', target: 'test_user_99' },
    { timestamp: new Date(), user: 'system', action: 'Backup', target: 'DB_Primary' },
  ];
}
