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
  selectedProduct: Product | null = null;
  recentProducts: Product[] = [];
  isDetailOpen = false;
  showForm = false;

  constructor(
    private dashboardService: DashboardService,
    public productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(stats => {
      this.stats = stats;
    });

    this.productsService.getData().subscribe(products => {
      this.products = products;
      this.recentProducts = [...products].slice(0, 5);

      if (this.selectedProduct) {
          const refreshed = products.find(
            trip => trip.productId === this.selectedProduct!.productId
          );

          this.selectedProduct = refreshed ?? null;

          if (!refreshed) {
            this.isDetailOpen = false;
          }
        }
      });
    
  }
  onBackToList(): void {
    this.isDetailOpen= false;
    this.selectedProduct=null;

  }
  onAddProduct(): void {
    this.selectedProduct = null; 
    this.showForm = true;


  }
  onEditProduct(product:Product): void {
    this.selectedProduct =product;
    this.showForm = true;

  }
  onViewDetails(product: Product) {
    this.selectedProduct = product;
    this.isDetailOpen = true;

  }
  onDeleteProduct(productId: number): void {
   
    if(confirm('Are you sure you want to delete this Product? ')){
      this.productsService.deleteProduct(productId);
      if(this.selectedProduct?.productId==productId){
        this.onBackToList();
      }
    }
  }

  get expiringSoonCount(): number {
    return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Expiring Soon').length;
  }

  onSaveProduct(product: Product): void {

  this.productsService.saveProduct(product);

  this.showForm = false;
  this.onBackToList();
}
  onCancelForm(): void {
    this.showForm=false;
  }
}