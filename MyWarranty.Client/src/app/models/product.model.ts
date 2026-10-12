export type WarrantyStatus = 'Active' | 'Expiring Soon' | 'Expired';

export interface Product {
  productId: number | undefined;
  name: string;
  brand: string;
  category: string;
  modelNumber: string;
  serialNumber: string;

  purchaseDate: string;      // yyyy-MM-dd
  purchasePrice: number;
  store: string;

  warrantyStartDate: string; // yyyy-MM-dd
  warrantyEndDate: string;   // yyyy-MM-dd
  warrantyDuration?: number;
  warrantyDurationUnit?: 'Years' | 'Months' | 'Days';

  notes: string;
  productImageUrl: string;
  invoiceUrl: string;
}