import { Component, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  user$ = this.authService.user$;

  isDarkMode = false;
  currentLanguage = "en";
  availableLanguages: string[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly translationService: TranslationService,
  ) {
    // Load saved theme from localStorage
    const savedMode = localStorage.getItem("theme");
    this.isDarkMode = savedMode === "dark";
    this.updateBodyClass();

    // Initialize language
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.availableLanguages = this.translationService.getAvailableLanguages();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    this.updateBodyClass();
  }

  updateBodyClass() {
    document.body.classList.toggle("dark-mode", this.isDarkMode);
  }

  onLogout() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) this.authService.logout();
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.currentLanguage = lang;
  }

  getLanguageName(lang: string): string {
    const names: { [key: string]: string } = {
      en: "English",
      kh: "Khmer",
      cn: "中文",
    };
    return names[lang] || lang.toUpperCase();
  }
}
