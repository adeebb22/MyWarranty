
import { Component, Input, Output, EventEmitter } from '@angular/core';
import navitems from '../../../../../public/data/sidebar.json';
import { ProductsService } from '../../../services/products-service';
import { Product } from '../../../models/product.model';

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
  @Input() mobileOpen = false;

  @Output() closeMobileMenu = new EventEmitter<void>();

  sections: NavSection[] = navitems;
  products: Product[] = [];

  badgeCounts: Record<string, number> = {
    'Expiring Soon': 0,
    'Expired': 0,
  };

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getData().subscribe({
      next: (products) => {
        this.products = products;

        this.badgeCounts['Expiring Soon'] = products.filter(
          product =>
            this.productsService.getWarrantyStatus(product) === 'Expiring Soon'
        ).length;

        this.badgeCounts['Expired'] = products.filter(
          product =>
            this.productsService.getWarrantyStatus(product) === 'Expired'
        ).length;
      },
      error: (error) => {
        console.error('Failed to load sidebar product counts:', error);
      }
    });
  }
}
