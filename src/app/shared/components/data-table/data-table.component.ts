import { Component, Input } from '@angular/core';

export interface ColumnConfig {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'currency' | 'badge' | 'action';
  badgeClassMap?: { [key: string]: string };
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;

  getBadgeClass(column: ColumnConfig, value: any): string {
    if (column.badgeClassMap && value) {
      return column.badgeClassMap[value] || 'badge-secondary';
    }
    return 'badge-secondary';
  }
}
