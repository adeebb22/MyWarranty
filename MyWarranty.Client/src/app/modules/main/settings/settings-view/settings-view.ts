
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme-service';

@Component({
  selector: 'app-settings-view',
  standalone: false,
  templateUrl: './settings-view.html',
  styleUrl: './settings-view.css'
})
export class SettingsView implements OnInit {

  name = 'Adeeb';
  email = 'adeeb@example.com';

  darkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkMode = this.themeService.getTheme() === 'dark';
  }

  onThemeChange(): void {
    const theme = this.darkMode ? 'dark' : 'light';

    this.themeService.setTheme(theme);
  }

  saveSettings(): void {
    console.log('Settings saved');
  }
}
