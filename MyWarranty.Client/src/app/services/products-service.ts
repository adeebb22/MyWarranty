import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, WarrantyStatus } from '../models/product.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
 
private apiUrl = 'https://mywarrantybackend.runasp.net/api/Product';

constructor(private http: HttpClient) {}

// Get all products
getData(): Observable<Product[]> {
  return this.http.get<Product[]>(
    `${this.apiUrl}/GetAllProducts`
  );
}

// Get product by ID
getProductById(productId: number): Observable<Product> {
  return this.http.get<Product>(
    `${this.apiUrl}/${productId}`
  );
}

// Create product
addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(
    this.apiUrl,
    product
  );
}

// Update product
updateProduct(product: Product): Observable<Product> {
  return this.http.put<Product>(
    `${this.apiUrl}/${product.productId}`,
    product
  );
}

// Delete product
deleteProduct(productId: number): Observable<void> {
  return this.http.delete<void>(
    `${this.apiUrl}/${productId}`
  );
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
    const dateValue = String(product.warrantyEndDate ?? '').slice(0, 10);

    const [year, month, day] = dateValue.split('-').map(Number);

    if (!year || !month || !day) {
      return NaN;
    }

    const endDate = new Date(year, month - 1, day);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return Math.round(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // Get warranty status
  getWarrantyStatus(product: Product): WarrantyStatus {
    const days = this.getDaysRemaining(product);

    if (Number.isNaN(days)) {
      return 'Active';
    }

    if (days < 0) {
      return 'Expired';
    }

    if (days <= 30) {
      return 'Expiring Soon';
    }

    return 'Active';
  }
  // Get expiring products
getExpiringProducts(): Observable<Product[]> {
  return this.getData().pipe(
    map(products => {
      console.log('All API products:', products);

      const filtered = products.filter(product => {
        const days = this.getDaysRemaining(product);
        const status = this.getWarrantyStatus(product);

        console.log('Expiring check:', {
          name: product.name,
          warrantyEndDate: product.warrantyEndDate,
          daysRemaining: days,
          status: status
        });

        return status === 'Expiring Soon';
      });

      console.log('Filtered expiring products:', filtered);
      return filtered;
    })
  );
}

getExpiredProducts(): Observable<Product[]> {
  return this.getData().pipe(
    map(products => {
      const filtered = products.filter(product => {
        const days = this.getDaysRemaining(product);
        const status = this.getWarrantyStatus(product);

        console.log('Expired check:', {
          name: product.name,
          warrantyEndDate: product.warrantyEndDate,
          daysRemaining: days,
          status: status
        });

        return status === 'Expired';
      });

      console.log('Filtered expired products:', filtered);
      return filtered;
    })
  );
}
  

}
