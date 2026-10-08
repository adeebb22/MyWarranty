import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductsService } from '../../../../services/products-service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  @Input({ required: true }) product!: Product;
  @Output() viewDetails = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();

  showMenu = false;

  constructor(public productsService: ProductsService) {}

  private get productRecord(): Record<string, unknown> {
    return this.product as unknown as Record<string, unknown>;
  }

  private readString(...keys: string[]): string {
    for (const key of keys) {
      const value = this.productRecord[key];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
    return '';
  }

  get nameText(): string {
    return this.readString('name', 'productName', 'Name', 'ProductName') || 'Unnamed product';
  }

  get brandText(): string {
    return this.readString('brand', 'Brand');
  }

  get modelNumberText(): string {
    return this.readString('modelNumber', 'ModelNumber', 'modelNo', 'ModelNo');
  }

  get categoryText(): string {
    return this.readString('category', 'Category') || 'Uncategorized';
  }

  get warrantyEndDateText(): string {
    return this.readString('warrantyEndDate', 'WarrantyEndDate') || '—';
  }

  get hasWarrantyEndDate(): boolean {
    const value = this.warrantyEndDateText;
    return value !== '—' && Number.isFinite(Date.parse(value));
  }

  get productSubText(): string {
    const parts = [this.brandText, this.modelNumberText].filter(Boolean);
    return parts.length ? parts.join(' · ') : 'No brand/model information';
  }

  get status(): string {
    return this.productsService.getWarrantyStatus(this.product);
  }

  get daysRemaining(): number {
    if (!this.hasWarrantyEndDate) {
      return 0;
    }
    return this.productsService.getDaysRemaining(this.product);
  }
  getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    Laptop: 'bi-laptop',
    Phone: 'bi-phone',
    TV: 'bi-tv',
    Refrigerator: 'bi-snow',
    'Washing Machine': 'bi-droplet-half'
  };

  return icons[category] ?? 'bi-box-seam';
}

  onView(): void {
    this.viewDetails.emit(this.product);
  }

  onDelete(): void {
    this.showMenu = false;
    this.delete.emit(this.product.productId);
  }
}