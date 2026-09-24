import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
   sidebarCollapsed = false;
    toggleSidebar():void{
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
}
