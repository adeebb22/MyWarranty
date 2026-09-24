import { Component, Input } from '@angular/core';
import navitems from '../../../../../public/data/sidebar.json';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() collapsed = false;
  sections: NavSection[] = navitems;

  // TODO: replace with live counts from a WarrantyService
  badgeCounts: Record<string, number> = {
    'Expiring Soon': 1,
    'Expired': 1,
  };
}