import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, WarrantyStatus } from '../models/product.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://localhost:7192/api/Products';

  constructor(private http: HttpClient){}
  
// Get all products
  getData(): Observable<Product[]> {
      return  this.http.get<Product[]>(`${this.apiUrl}/GetProducts`);
  }
// Get product by ID
  getProductById(productId: number): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/GetProductById/${productId}`);
  }
//Create Product
 addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(`${this.apiUrl}/CreateProduct`,product);
}

updateProduct(product: Product): Observable<Product> {
 return this.http.put<Product>(`${this.apiUrl}/UpdateProduct/${product.productId}`,product);

}
//Delete Product
deleteProduct(productId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/DeleteProductById/${productId}`);
}
// Save product
  saveProduct(product: Product): Observable<Product> {
    if(product.productId){
    return this.updateProduct(product);
    }
     return this.addProduct(product);
  }

  // Calculate remaining warranty days
  getDaysRemaining(product: Product): number {
    const end = new Date(product.warrantyEndDate).getTime();
    const today = new Date().setHours(0, 0, 0, 0);

    return Math.ceil(
      (end - today) / (1000 * 60 * 60 * 24)
    );
  }

  // Get warranty status
  getWarrantyStatus(product: Product): WarrantyStatus {
    const days = this.getDaysRemaining(product);

    if (days < 0) {
      return 'Expired';
    }

    if (days <= 30) {
      return 'Expiring Soon';
    }

    return 'Active';
  }

}