import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  user$ = this.authService.user$;

  isDarkMode = false;

  constructor(private authService: AuthService) {
    // Load saved theme from localStorage
    const savedMode = localStorage.getItem('theme');
    this.isDarkMode = savedMode === 'dark';
    this.updateBodyClass();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateBodyClass();
  }

  updateBodyClass() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  onLogout() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) this.authService.logout();
  }
}
