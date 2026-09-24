import { Component } from '@angular/core';
import { EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
   @Output() toggleSidebar = new EventEmitter<void>();

   searchTerm = '';
}
