import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { StatCardData } from '../../../../models/dashboard.model';
import { ProductsService } from '../../../../services/products-service';
import { DashboardService } from '../../../../services/dashboard-service';

@Component({
  selector: 'app-dashboard-view',
  standalone: false,
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.css',
})
export class DashboardView implements OnInit {

  stats: StatCardData[] = [];
  products: Product[] = [];
  recentProducts: Product[] = [];

  constructor(
    private dashboardService: DashboardService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(stats => {
      this.stats = stats;
    });

    this.productsService.getData().subscribe(products => {
      this.products = products;
      this.recentProducts = [...products].slice(0, 5);
    });
  }

  get expiringSoonCount(): number {
    return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Expiring Soon').length;
  }
}