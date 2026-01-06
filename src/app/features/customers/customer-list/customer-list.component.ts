import { Component } from "@angular/core";
import { ColumnConfig } from "src/app/shared/components/data-table/data-table.component";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent {
  searchTerm: string = "";
  selectedCustomer: any = null;

  get filteredCustomers() {
    const term = this.searchTerm && this.searchTerm.toLowerCase().trim();
    if (!term) {
      return this.customers;
    }
    return this.customers.filter((c) => {
      return (
        (c.name && c.name.toLowerCase().includes(term)) ||
        (c.company && c.company.toLowerCase().includes(term)) ||
        (c.status && c.status.toLowerCase().includes(term))
      );
    });
  }

  onSearchChange(_: string) {
    // placeholder for future debounce or analytics
  }
  columns: ColumnConfig[] = [
    { key: "name", label: "Customer" },
    { key: "company", label: "Company" },
    {
      key: "status",
      label: "Status",
      type: "badge",
      badgeClassMap: { Active: "badge-success", Inactive: "badge-danger" },
    },
    { key: "spent", label: "Lifetime Value", type: "currency" },
    { key: "actions", label: "Actions", type: "action" },
  ];

  customers = [
    {
      id: 1,
      name: "Alice Thompson",
      company: "TechFlow Inc",
      status: "Active",
      spent: 12500.5,
      email: "alice.thompson@techflow.example",
      phone: "+1 (555) 123-4567",
      address: "123 Market St, San Francisco, CA",
      joined: new Date(2019, 4, 12),
      lastOrder: 1200.0,
    },
    {
      id: 2,
      name: "Mark Stevens",
      company: "Global Solutions",
      status: "Active",
      spent: 4500.0,
      email: "mark.stevens@globalsol.example",
      phone: "+1 (555) 987-6543",
      address: "88 Broad Ave, New York, NY",
      joined: new Date(2020, 1, 6),
      lastOrder: 300.0,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      company: "Creative Agency",
      status: "Inactive",
      spent: 1200.0,
      email: "elena.rodriguez@creative.example",
      phone: "+1 (555) 222-3344",
      address: "42 Pine Ln, Austin, TX",
      joined: new Date(2018, 9, 30),
      lastOrder: 0.0,
    },
  ];

  openCustomer(cust: any) {
    this.selectedCustomer = cust;
  }

  closeCustomer() {
    this.selectedCustomer = null;
  }

  onAction(ev: { type: string; row: any }) {
    if (ev.type === "edit") {
      this.openCustomer(ev.row);
      return;
    }
    if (ev.type === "delete") {
      const ok = confirm(`Delete ${ev.row.name}?`);
      if (ok) {
        this.customers = this.customers.filter((c) => c.id !== ev.row.id);
      }
    }
  }

  getStatusBadge(status: string) {
    return status === "Active" ? "badge-success" : "badge-danger";
  }
}
