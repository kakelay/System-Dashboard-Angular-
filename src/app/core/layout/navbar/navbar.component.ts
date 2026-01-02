import { Component, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  user$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  onLogout() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      this.authService.logout();
    }else {
      // Do nothing if the user cancels the logout
      return;
    }
  }
}
