import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  role?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isCollapsed = false;

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Users', icon: 'people', route: '/users', role: 'ADMIN' },
    { label: 'Roles', icon: 'security', route: '/roles', role: 'ADMIN' },
    { label: 'Customers', icon: 'business', route: '/customers' },
    { label: 'Transactions', icon: 'receipt_long', route: '/transactions' },
    { label: 'Reports', icon: 'bar_chart', route: '/reports' },
    { label: 'Audit Log', icon: 'history', route: '/audit-log', role: 'ADMIN' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  constructor(public authService: AuthService) {}

  shouldShow(item: NavItem): boolean {
    if (!item.role) return true;
    return this.authService.getUserRole() === item.role;
  }
}
