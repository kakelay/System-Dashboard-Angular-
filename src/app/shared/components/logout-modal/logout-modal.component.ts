import { Component, Inject } from "@angular/core";

@Component({
  selector: "app-logout-modal",
  templateUrl: "./logout-modal.component.html",
  styleUrls: ["./logout-modal.component.scss"],
})
export class LogoutModalComponent {
  isLoading = false;

  constructor(@Inject("MODAL_DATA") public data: any) {}

  onConfirm(): void {
    this.isLoading = true;
    if (this.data.onConfirm) {
      this.data.onConfirm();
    }
  }

  onCancel(): void {
    if (this.data.onCancel) {
      this.data.onCancel();
    }
  }
}
