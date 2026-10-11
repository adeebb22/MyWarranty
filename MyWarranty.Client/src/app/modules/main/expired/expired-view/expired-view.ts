import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductsService } from '../../../../services/products-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expired-view',
  standalone: false,
  templateUrl: './expired-view.html',
  styleUrl: './expired-view.css'
})
export class ExpiredView implements OnInit {

  products: Product[] = [];
  expiredProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  
ngOnInit(): void {
  this.productsService.getExpiredProducts().subscribe({
    next: (data) => {
  this.expiredProducts = data;
  this.cdr.detectChanges();

  console.log('Expired products displayed:', this.expiredProducts.length);
},
    error: (error) => {
      console.error('Error loading expired products:', error);
    }
  });
}

getDaysExpired(product: Product): number {
  return Math.abs(
    this.productsService.getDaysRemaining(product)
  );
}
}