import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
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
