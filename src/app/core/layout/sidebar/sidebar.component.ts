import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

interface NavItem {
  label: string;
  icon: string;
  route: string;
  role?: string;
  class?: string;
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Input() isDarkMode = false;

  user$ = this.authService.user$;
  showLogoutModal = false;

  navItems: NavItem[] = [
    { label: "Dashboard", icon: "dashboard", route: "/dashboard" },
    { label: "Users", icon: "people", route: "/users", role: "ADMIN" },
    { label: "Roles", icon: "security", route: "/roles", role: "ADMIN" },
    { label: "Customers", icon: "business", route: "/customers" },
    { label: "Transactions", icon: "receipt_long", route: "/transactions" },
    { label: "Reports", icon: "bar_chart", route: "/reports" },
    { label: "Audit Log", icon: "history", route: "/audit-log", role: "ADMIN" },
    { label: "Settings", icon: "settings", route: "/settings" },
    {
      label: "Logout",
      icon: "logout",
      route: "/auth/login",
      class: "logout-item",
    },
  ];

  constructor(public authService: AuthService, public router: Router) {}

  shouldShow(item: NavItem): boolean {
    if (!item.role) return true;
    return this.authService.getUserRole() === item.role;
  }

  onNavItemClick(item: NavItem, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    if (item.label === "Logout" || item.route === "/auth/login") {
      this.openLogoutModal();
      return;
    }
    this.router.navigate([item.route]);
  }

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  onLogoutConfirm(): void {
    this.showLogoutModal = false;
    this.authService.logout();
  }

  onLogoutCancel(): void {
    this.showLogoutModal = false;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }
}
