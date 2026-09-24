import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, WarrantyStatus } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private productsSubject = new BehaviorSubject<Product[]>([
    {
      id: 'PRD001', name: 'Dell Inspiron 15', brand: 'Dell', category: 'Laptop',
      modelNumber: 'Inspiron 15-3530', serialNumber: 'DLXPS159834',
      purchaseDate: '2024-06-01', purchasePrice: 62000, store: 'Croma, Kochi',
      warrantyStartDate: '2024-06-01', warrantyDurationMonths: 60, warrantyEndDate: '2029-06-01',
      notes: '', productImageUrl: '', invoiceUrl: ''
    },
    {
      id: 'PRD002', name: 'Samsung Washing Machine', brand: 'Samsung', category: 'Washing Machine',
      modelNumber: 'WW70T4020CX', serialNumber: 'SWM7402CX221',
      purchaseDate: '2025-02-20', purchasePrice: 28500, store: 'Reliance Digital',
      warrantyStartDate: '2025-02-20', warrantyDurationMonths: 36, warrantyEndDate: '2028-02-20',
      notes: '', productImageUrl: '', invoiceUrl: ''
    },
    {
      id: 'PRD003', name: 'iPhone 15', brand: 'Apple', category: 'Phone',
      modelNumber: 'A3090', serialNumber: 'F2LXQ7HMHG4V',
      purchaseDate: '2025-01-15', purchasePrice: 79900, store: 'Apple Store, BKC',
      warrantyStartDate: '2025-01-15', warrantyDurationMonths: 24, warrantyEndDate: '2027-01-15',
      notes: '', productImageUrl: '', invoiceUrl: ''
    },
    {
      id: 'PRD004', name: 'LG Refrigerator', brand: 'LG', category: 'Refrigerator',
      modelNumber: 'GL-T262TPZX', serialNumber: 'LGREF2262PZ',
      purchaseDate: '2025-10-11', purchasePrice: 34500, store: 'LG Best Shop',
      warrantyStartDate: '2025-10-11', warrantyDurationMonths: 12, warrantyEndDate: '2026-10-11',
      notes: '', productImageUrl: '', invoiceUrl: ''
    },
    {
      id: 'PRD005', name: 'Sony Bravia TV', brand: 'Sony', category: 'TV',
      modelNumber: 'KD-55X74L', serialNumber: 'SNYTV55X74L',
      purchaseDate: '2024-08-05', purchasePrice: 58900, store: 'Vijay Sales',
      warrantyStartDate: '2024-08-05', warrantyDurationMonths: 12, warrantyEndDate: '2025-08-05',
      notes: '', productImageUrl: '', invoiceUrl: ''
    }
  ]);

  getData(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductsSnapshot(): Product[] {
    return this.productsSubject.value;
  }

  getProductById(id: string): Product | undefined {
    return this.productsSubject.value.find(p => p.id === id);
  }

  addProduct(product: Product): void {
    const updated = [...this.productsSubject.value, product];
    this.productsSubject.next(updated);
  }

  updateProduct(product: Product): void {
    const updated = this.productsSubject.value.map(p =>
      p.id === product.id ? product : p
    );
    this.productsSubject.next(updated);
  }

  deleteProduct(id: string): void {
    const updated = this.productsSubject.value.filter(p => p.id !== id);
    this.productsSubject.next(updated);
  }

  getDaysRemaining(product: Product): number {
    const end = new Date(product.warrantyEndDate).getTime();
    const today = new Date().setHours(0, 0, 0, 0);
    return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  }

  getWarrantyStatus(product: Product): WarrantyStatus {
    const days = this.getDaysRemaining(product);
    if (days < 0) return 'Expired';
    if (days <= 30) return 'Expiring Soon';
    return 'Active';
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
}