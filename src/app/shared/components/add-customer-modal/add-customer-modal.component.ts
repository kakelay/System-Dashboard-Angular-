import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "src/app/core/services/customer.service";
import { TranslationService } from "src/app/core/services/translation.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-add-customer-modal",
  templateUrl: "./add-customer-modal.component.html",
  styleUrls: ["./add-customer-modal.component.scss"],
})
export class AddCustomerModalComponent implements OnInit, OnDestroy {
  @Output() cancel = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  @Input() isOpen = true;

  addCustomerForm!: FormGroup;
  isLoading = false;
  currentLanguage = "en";

  private destroy$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerService: CustomerService,
    private readonly translationService: TranslationService,
    private readonly notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToLanguageChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.addCustomerForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      addressLine1: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      zipCode: ["", [Validators.required]],
      idNumber: ["", [Validators.required]],
      idType: ["", [Validators.required]],
      bio: [""],
      website: [""],
      theme: ["light"],
      language: [this.translationService.getCurrentLanguage()],
      timezone: ["Asia/Phnom_Penh"],
    });
  }

  private subscribeToLanguageChanges(): void {
    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang) => {
        this.currentLanguage = lang;
      });
  }

  translate(key: string): string {
    return this.translationService.translate(key, this.currentLanguage);
  }

  onSubmit(): void {
    if (this.addCustomerForm.invalid) {
      this.notificationService.error(this.translate("validation.required"));
      return;
    }

    this.isLoading = true;

    const formData = this.addCustomerForm.value;

    this.customerService
      .createUser(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (
            response?.responseCode === "00" ||
            response?.status === "Success"
          ) {
            // Display API response message (will be in selected language)
            const successMessage =
              response?.message || this.translate("message.success");
            this.notificationService.success(successMessage);
            setTimeout(() => {
              this.success.emit();
            }, 1500);
          } else {
            // Display error message from API (will be in selected language)
            const errorMessage =
              response?.message || this.translate("message.error");
            this.notificationService.error(errorMessage);
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          // Display error message from API response or fallback error
          const errorMessage =
            error?.error?.message ||
            error?.message ||
            this.translate("message.serverError");
          this.notificationService.error(errorMessage);
        },
      });
  }

  onCancelClick(): void {
    this.cancel.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.addCustomerForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors["required"]) {
        return this.translate("validation.required");
      }
      if (control.errors["email"]) {
        return this.translate("validation.email");
      }
      if (control.errors["minlength"]) {
        return this.translate("validation.password");
      }
    }
    return "";
  }
}
