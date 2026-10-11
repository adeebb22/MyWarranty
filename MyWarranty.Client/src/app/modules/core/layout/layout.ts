
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  sidebarCollapsed = false;
  mobileOpen = false;

  toggleSidebar(): void {
  if (window.innerWidth <= 768) {
    this.mobileOpen = !this.mobileOpen;
  } else {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}

  closeMobileMenu(): void {
    this.mobileOpen = false;
  }
}
