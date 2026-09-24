import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatCardData } from '../models/dashboard.model';
import { ProductsService } from './products-service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private statsSubject = new BehaviorSubject<StatCardData[]>([]);

  constructor(private productsService: ProductsService) {
    this.productsService.getData().subscribe(products => {

      let active = 0;
      let expiringSoon = 0;
      let expired = 0;

      products.forEach(product => {
        const status = this.productsService.getWarrantyStatus(product);
        if (status === 'Active') active++;
        if (status === 'Expiring Soon') expiringSoon++;
        if (status === 'Expired') expired++;
      });

      this.statsSubject.next([
        { label: 'TOTAL PRODUCTS', value: products.length, subtext: 'Registered', valueColor: '#2563eb' },
        { label: 'ACTIVE WARRANTIES', value: active, subtext: 'Currently covered', valueColor: '#059669' },
        { label: 'EXPIRING SOON', value: expiringSoon, subtext: 'Within 30 days', valueColor: '#d97706' },
        { label: 'EXPIRED', value: expired, subtext: 'Needs attention', valueColor: '#dc2626' }
      ]);
    });
  }

  getStats(): Observable<StatCardData[]> {
    return this.statsSubject.asObservable();
  }
}