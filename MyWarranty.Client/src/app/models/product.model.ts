export type WarrantyStatus = 'Active' | 'Expiring Soon' | 'Expired';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  modelNumber: string;
  serialNumber: string;

  purchaseDate: string;      // yyyy-MM-dd
  purchasePrice: number;
  store: string;

  warrantyStartDate: string; // yyyy-MM-dd
  warrantyDurationMonths: number;
  warrantyEndDate: string;   // yyyy-MM-dd

  notes: string;
  productImageUrl: string;
  invoiceUrl: string;
}