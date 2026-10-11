
import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme: Theme = 'light';

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.currentTheme = savedTheme;
    }

    this.applyTheme();
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;

    localStorage.setItem('theme', theme);

    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.setAttribute(
      'data-theme',
      this.currentTheme
    );
  }
}
