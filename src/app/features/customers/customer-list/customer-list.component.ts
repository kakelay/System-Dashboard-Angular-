import { Component, OnInit } from "@angular/core";
import { ColumnConfig } from "src/app/shared/components/data-table/data-table.component";
import { CustomerService } from "src/app/core/services/customer.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  searchTerm: string = "";
  selectedCustomer: any = null;

  customers: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // =========================
  // LOAD API DATA
  // =========================
  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (res: any) => {
        const users = res?.data ?? [];

        this.customers = users.map((u: any) => ({
          id: u.cid,

          // CORE INFO
          name: u.name ?? "-",
          phone: u.phone ?? "-",
          email: u.email ?? "-",

          // LOCATION INFO
          address: u.address ?? "-",
          city: u.city ?? "-",
          state: u.state ?? "-",
          country: u.country ?? "-",
          zipCode: u.zipCode ?? "-",

          // OPTIONAL INFO
          bio: u.bio ?? "",
          website: u.website ?? "",

          // UI FIELDS
          location:
            u.city || u.country
              ? `${u.city ?? ""}${u.city && u.country ? ", " : ""}${u.country ?? ""}`
              : "N/A",

          status: "ACTIVE",
          spent: 0,
        }));

        console.log("MAPPED CUSTOMERS:", this.customers);
      },
      error: (err: any) => {
        console.error("API ERROR:", err);
      },
    });
  }

  // =========================
  // SEARCH FILTER
  // =========================
  get filteredCustomers() {
    const term = this.searchTerm?.toLowerCase().trim();
    if (!term) return this.customers;

    return this.customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.phone?.toLowerCase().includes(term) ||
        c.location?.toLowerCase().includes(term),
    );
  }

  onSearchChange(_: string) {}

  // =========================
  // TABLE CONFIG
  // =========================
  columns: ColumnConfig[] = [
    { key: "name", label: "Customer" },
    { key: "email", label: "Contact" },
    { key: "location", label: "Location" },

    {
      key: "status",
      label: "Status",
      type: "badge",
      badgeClassMap: {
        ACTIVE: "badge-success",
        INACTIVE: "badge-danger",
      },
    },

    { key: "actions", label: "", type: "action" },
  ];

  // =========================
  // DRAWER
  // =========================
  openCustomer(cust: any) {
    this.selectedCustomer = cust;
  }

  closeCustomer() {
    this.selectedCustomer = null;
  }

  // =========================
  // ACTION HANDLER
  // =========================
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

  // =========================
  // BADGE STYLE
  // =========================
  getStatusBadge(status: string) {
    return status === "ACTIVE" ? "badge-success" : "badge-danger";
  }
}
