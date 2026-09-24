import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getData().subscribe(products => {
      this.products = products;
      this.applyFilters();

      if (this.selectedProduct) {
        const refreshed = products.find(p => p.id === this.selectedProduct!.id);
        this.selectedProduct = refreshed ?? null;
        if (!refreshed) this.isDetailOpen = false;
      }
    });

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const match = this.productsService.getProductById(id);
        if (match) {
          this.selectedProduct = match;
          this.isDetailOpen = true;
        }
      }
    });
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
      list = list.filter(p => this.productsService.getWarrantyStatus(p) === this.activeFilter);
    }

    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.modelNumber.toLowerCase().includes(term)
      );
    }

    this.filteredProducts = list;
  }

  get countAll(): number { return this.products.length; }
  get countActive(): number { return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Active').length; }
  get countExpiringSoon(): number { return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Expiring Soon').length; }
  get countExpired(): number { return this.products.filter(p => this.productsService.getWarrantyStatus(p) === 'Expired').length; }

  onViewDetails(product: Product): void {
    this.selectedProduct = product;
    this.isDetailOpen = true;
  }

  onBackToList(): void {
    this.isDetailOpen = false;
    this.selectedProduct = null;
    this.router.navigate([], { queryParams: {} });
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
    const exists = this.products.some(p => p.id === product.id);
    if (exists) {
      this.productsService.updateProduct(product);
    } else {
      this.productsService.addProduct(product);
    }
    this.showForm = false;
    this.onBackToList();
  }

  onCancelForm(): void {
    this.showForm = false;
  }

  onDeleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id);
      if (this.selectedProduct?.id === id) this.onBackToList();
    }
  }
}