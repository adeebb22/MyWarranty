
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductsService } from '../../../../services/products-service';

@Component({
  selector: 'app-expiring-view',
  standalone: false,
  templateUrl: './expiring-view.html',
  styleUrl: './expiring-view.css'
})
export class ExpiringView implements OnInit {
  expiringProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productsService.getExpiringProducts().subscribe({
      next: (data) => {
        this.expiringProducts = data;
        this.cdr.detectChanges();

        console.log('Expiring products displayed:', this.expiringProducts.length);
      },
      error: (error) => {
        console.error('Error loading expiring products:', error);
      }
    });
  }

  getDaysRemaining(product: Product): number {
    return this.productsService.getDaysRemaining(product);
  }
}
