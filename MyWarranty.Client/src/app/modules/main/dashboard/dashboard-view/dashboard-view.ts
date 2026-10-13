import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.dashboardService.getStats().subscribe(stats => {
      this.stats = stats;
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
  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }

  this.productsService.deleteProduct(productId).subscribe({
    next: () => {
      this.loadProducts();

      if (this.selectedProduct?.productId === productId) {
        this.onBackToList();
      }
    },
    error: (error) => {
      console.error('Failed to delete product:', error);
    }
  });
}


  get expiringSoonCount(): number {
    return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Expiring Soon').length;
  }
loadProducts(): void {
    this.productsService.getData().subscribe({
      next: (products) => {
        this.products = products;
        this.recentProducts = [...products].slice(0, 5);

        if (this.selectedProduct) {
          const refreshed = products.find(
            p => p.productId === this.selectedProduct!.productId
          );

          this.selectedProduct = refreshed ?? null;

          if (!refreshed) {
            this.isDetailOpen = false;
          }
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load products:', error);
      }
    });
  }
  onSaveProduct(product: Product): void {

  this.productsService.saveProduct(product).subscribe({
      next: (result) => {
       
        this.showForm = false;
        this.loadProducts();
      },
      error: (error) => {
        console.error('Save API error:', error);
      }
    });
}
  onCancelForm(): void {
    this.showForm=false;
  }
}
