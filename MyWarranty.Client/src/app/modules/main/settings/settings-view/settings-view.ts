import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-view',
  standalone: false,
  templateUrl: './settings-view.html',
  styleUrl: './settings-view.css'
})
export class SettingsView {

  name = 'Arjun';
  email = 'arjun@example.com';

  darkMode = false;

  saveSettings(): void {

    console.log('Settings saved');

  }

}