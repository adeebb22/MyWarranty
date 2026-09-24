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
  @Output() delete = new EventEmitter<string>();

  showMenu = false;

  constructor(public productsService: ProductsService) {}

  get status(): string {
    return this.productsService.getWarrantyStatus(this.product);
  }

  get daysRemaining(): number {
    return this.productsService.getDaysRemaining(this.product);
  }

  onView(): void {
    this.viewDetails.emit(this.product);
  }

  onDelete(): void {
    this.showMenu = false;
    this.delete.emit(this.product.id);
  }
}