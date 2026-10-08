import { Component, OnInit } from '@angular/core';
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
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {

    this.productsService.getData().subscribe(products => {

      this.products = products;

      this.expiredProducts = products.filter(
        product =>
          this.productsService.getWarrantyStatus(product) === 'Expired'
      );

    });

  }

}