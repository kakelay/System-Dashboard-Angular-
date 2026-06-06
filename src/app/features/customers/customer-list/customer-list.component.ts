import { Component, OnInit } from "@angular/core";
import { ColumnConfig } from "src/app/shared/components/data-table/data-table.component";
import { CustomerService } from "src/app/core/services/customer.service";
import { TranslationService } from "src/app/core/services/translation.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  searchTerm: string = "";
  selectedCustomer: any = null;
  showAddCustomerModal: boolean = false;

  customers: any[] = [];
  loading: boolean = false; // ✅ HERE
  currentLanguage = "en";

  constructor(
    private readonly customerService: CustomerService,
    private readonly translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.subscribeToLanguageChanges();
  }

  private subscribeToLanguageChanges(): void {
    this.translationService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key, this.currentLanguage);
  }

  // =========================
  // LOAD API DATA
  // =========================
  loadCustomers() {
    this.loading = true; // ✅ START LOADING

    this.customerService.getCustomers().subscribe({
      next: (res: any) => {
        const users = res?.data ?? [];

        this.customers = users.map((u: any) => ({
          id: u.cid,

          name: u.name ?? "-",
          phone: u.phone ?? "-",
          email: u.email ?? "-",

          address: u.address ?? "-",
          city: u.city ?? "-",
          state: u.state ?? "-",
          country: u.country ?? "-",
          zipCode: u.zipCode ?? "-",

          bio: u.bio ?? "",
          website: u.website ?? "",

          location:
            u.city || u.country
              ? `${u.city ?? ""}${u.city && u.country ? ", " : ""}${u.country ?? ""}`
              : "N/A",

          status: "ACTIVE",
          spent: 0,
        }));

        this.loading = false; // ✅ STOP LOADING
      },

      error: (err: any) => {
        console.error("API ERROR:", err);
        this.loading = false; // ✅ STOP EVEN ERROR
      },
    });
  }
  // =========================
  // PAGINATION
  // =========================
  page = 1;
  pageSize = 5;
  totalPages = 0;

  get paginatedCustomers() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredCustomers.slice(start, start + this.pageSize);
  }
  get totalPageCount() {
    return Math.ceil(this.filteredCustomers.length / this.pageSize);
  }
  onSearchChange(_: string) {
    this.page = 1;
  }

  nextPage() {
    if (this.page < this.totalPageCount) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  // end of page change handlers

  changePageSize(size: number) {
    this.pageSize = Number(size);
    this.page = 1; // reset page
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

  // =========================
  // ADD CUSTOMER MODAL
  // =========================
  openAddCustomerModal(): void {
    this.showAddCustomerModal = true;
  }

  onAddCustomerSuccess(): void {
    this.showAddCustomerModal = false;
    // Reload customers list
    this.loadCustomers();
  }

  onAddCustomerCancel(): void {
    this.showAddCustomerModal = false;
  }
}
