import { Component, Input, Output, EventEmitter } from "@angular/core";

export interface ColumnConfig {
  key: string;
  label: string;
  type?: "text" | "date" | "currency" | "badge" | "action";
  badgeClassMap?: { [key: string]: string };
}

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
})
export class DataTableComponent {
  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Output() rowClick = new EventEmitter<any>();
  @Output() action = new EventEmitter<{ type: string; row: any }>();

  getBadgeClass(column: ColumnConfig, value: any): string {
    if (column.badgeClassMap && value) {
      return column.badgeClassMap[value] || "badge-secondary";
    }
    return "badge-secondary";
  }

  onAction(row: any, type: string, event?: Event) {
    event?.stopPropagation();
    this.action.emit({ type, row });
  }
}
