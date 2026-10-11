import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductsService } from '../../../../services/products-service';

type FilterKey = 'All' | 'Active' | 'Expiring Soon' | 'Expired';

@Component({
  selector: 'app-myproducts-view',
  standalone: false,
  templateUrl: './myproducts-view.html',
  styleUrl: './myproducts-view.css',
})
export class MyProductsView implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchTerm = '';
  activeFilter: FilterKey = 'All';

  selectedProduct: Product | null = null;
  isDetailOpen = false;
  showForm = false;

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadProducts();
  }


  setFilter(filter: FilterKey): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }

  
private applyFilters(): void {
  let list = this.products;

  if (this.activeFilter !== 'All') {
    list = list.filter(
      p => this.productsService.getWarrantyStatus(p) === this.activeFilter
    );
  }

  const term = this.searchTerm.trim().toLowerCase();

  if (term) {
    list = list.filter(p =>
      (p.name ?? '').toLowerCase().includes(term) ||
      (p.brand ?? '').toLowerCase().includes(term) ||
      (p.modelNumber ?? '').toLowerCase().includes(term) ||
      (p.serialNumber ?? '').toLowerCase().includes(term)
    );
  }

  this.filteredProducts = list;
}


  get countAll(): number { return this.products.length; }
  get countActive(): number { return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Active').length; }
  get countExpiringSoon(): number { return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Expiring Soon').length; }
  get countExpired(): number { return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Expired').length; }



  loadProducts(): void {
    this.productsService.getData().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilters();

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
  onViewDetails(product: Product): void {
    this.selectedProduct = product;
    this.isDetailOpen = true;
  }

  onBackToList(): void {
    this.isDetailOpen = false;
    this.selectedProduct = null;
  }

  onAddProduct(): void {
    this.selectedProduct = null;
    this.showForm = true;
  }

  onEditProduct(product: Product): void {
    this.selectedProduct = product;
    this.showForm = true;
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
    this.showForm = false;
  }

  onDeleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(productId).subscribe({
        next: () => {
          this.onBackToList();
          this.loadProducts();

        },
        error: (error) => {
          console.error('Delete Failed: ', error);
        }
      });
    }
  }
}