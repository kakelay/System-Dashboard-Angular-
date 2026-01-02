import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  template: `
    <h1>Settings</h1>
    <div class="card mt-4">
      <form [formGroup]="settingsForm" (ngSubmit)="save()">
        <div class="settings-section">
          <h3>General Configuration</h3>
          <div class="form-group mt-4">
            <label>Application Name</label>
            <input type="text" formControlName="appName" class="form-input">
          </div>
          <div class="form-group">
            <label>Support Email</label>
            <input type="email" formControlName="supportEmail" class="form-input">
          </div>
        </div>
        
        <div class="settings-section mt-4">
          <h3>Preferences</h3>
          <label class="flex items-center gap-2">
            <input type="checkbox" formControlName="enableNotifications"> Enable Email Notifications
          </label>
        </div>

        <div class="mt-4 pt-4 border-top">
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .settings-section { padding-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; }
    .border-top { border-top: 1px solid #e2e8f0; }
    .form-input { width: 100%; padding: 0.6rem; border: 1px solid #e2e8f0; border-radius: 0.4rem; }
    .form-group { margin-bottom: 1rem; }
    .gap-2 { gap: 0.5rem; }
  `]
})
export class SettingsComponent {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      appName: ['Enterprise Back-Office'],
      supportEmail: ['support@company.com'],
      enableNotifications: [true]
    });
  }

  save() {
    console.log('Saved settings:', this.settingsForm.value);
    alert('Settings updated successfully!');
  }
}
