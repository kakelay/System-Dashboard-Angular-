import { Component, OnInit } from "@angular/core";
import { ColumnConfig } from "src/app/shared/components/data-table/data-table.component";

interface Transaction {
  id: string;
  amount: number;
  status: "Success" | "Failed" | "Pending";
  date: string;
}

@Component({
  selector: "app-transaction-list",
  templateUrl: "./transaction-list.component.html",
  styleUrls: ["./transaction-list.component.scss"],
})
export class TransactionListComponent implements OnInit {
  columns: ColumnConfig[] = [
    { key: "id", label: "TX ID" },
    { key: "amount", label: "Amount", type: "currency" },
    {
      key: "status",
      label: "Status",
      type: "badge",
      badgeClassMap: {
        Success: "badge-success",
        Pending: "badge-warning",
        Failed: "badge-danger",
      },
    },
    { key: "date", label: "Date", type: "date" },
  ];

  transactions: Transaction[] = [
    { id: "TX-9981", amount: 500.0, status: "Success", date: "2023-10-01" },
    { id: "TX-9982", amount: 45.0, status: "Failed", date: "2023-10-02" },
    { id: "TX-9983", amount: 1250.75, status: "Pending", date: "2023-10-03" },
    { id: "TX-9984", amount: 2100.5, status: "Success", date: "2023-10-04" },
    { id: "TX-9985", amount: 350.25, status: "Success", date: "2023-10-05" },
    { id: "TX-9986", amount: 875.0, status: "Failed", date: "2023-10-06" },
  ];

  filteredTransactions: Transaction[] = [];
  searchText: string = "";
  selectedStatus: string = "";
  selectedDate: string = "";
  isLoading: boolean = false;

  ngOnInit(): void {
    this.filteredTransactions = [...this.transactions];
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onClearFilters(): void {
    this.searchText = "";
    this.selectedStatus = "";
    this.selectedDate = "";
    this.applyFilters();
  }

  onRefresh(): void {
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }

  onExportCSV(): void {
    const headers = this.columns.map((col) => col.label).join(",");
    const rows = this.filteredTransactions.map(
      (tx) => `${tx.id},${tx.amount},${tx.status},${tx.date}`
    );
    const csv = [headers, ...rows].join("\n");

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    );
    element.setAttribute(
      "download",
      `transactions-${new Date().getTime()}.csv`
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private applyFilters(): void {
    this.filteredTransactions = this.transactions.filter((tx) => {
      const matchesSearch =
        !this.searchText ||
        tx.id.toLowerCase().includes(this.searchText.toLowerCase()) ||
        tx.amount.toString().includes(this.searchText);

      const matchesStatus =
        !this.selectedStatus || tx.status === this.selectedStatus;
      const matchesDate = !this.selectedDate || tx.date === this.selectedDate;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  getSuccessCount(): number {
    return this.transactions.filter((tx) => tx.status === "Success").length;
  }
}
