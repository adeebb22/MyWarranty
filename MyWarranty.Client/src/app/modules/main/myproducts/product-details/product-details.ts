import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductsService } from '../../../../services/products-service';

type ProductTab = 'overview' | 'warranty' | 'documents';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnChanges {

  @Input({ required: true }) product!: Product;

  @Output() back = new EventEmitter<void>();
  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<string>();

  activeTab: ProductTab = 'overview';
  showMoreMenu = false;

  tabs: { key: ProductTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'warranty', label: 'Warranty' },
    { key: 'documents', label: 'Documents' },
  ];

  constructor(public productsService: ProductsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['product'];
    if (change && !change.firstChange && change.previousValue?.id !== change.currentValue?.id) {
      this.activeTab = 'overview';
      this.showMoreMenu = false;
    }
  }

  setTab(tab: ProductTab): void {
    this.activeTab = tab;
  }

  get status(): string {
    return this.productsService.getWarrantyStatus(this.product);
  }

  get daysRemaining(): number {
    return this.productsService.getDaysRemaining(this.product);
  }

  onEdit(): void {
    this.showMoreMenu = false;
    this.editProduct.emit(this.product);
  }

  onDelete(): void {
    this.showMoreMenu = false;
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct.emit(this.product.id);
    }
  }
}