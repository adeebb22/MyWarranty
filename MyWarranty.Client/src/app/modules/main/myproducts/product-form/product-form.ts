import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../models/product.model';

interface StepConfig { step: number; label: string; }

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnChanges {

  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  currentStep = 1;

  steps: StepConfig[] = [
    { step: 1, label: 'Product Info' },
    { step: 2, label: 'Purchase & Warranty' },
    { step: 3, label: 'Photos & Documents' },
    { step: 4, label: 'Review' },
  ];

  categoryOptions = ['Phone', 'Laptop', 'TV', 'Refrigerator', 'Washing Machine', 'Other'];
  durationOptions = [6, 12, 24, 36, 60];

  productImagePreview: string | null = null;
  invoiceFileName: string | null = null;

  ProductForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ProductForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['Phone', Validators.required],
      modelNumber: [''],
      serialNumber: [''],
      purchaseDate: ['', Validators.required],
      purchasePrice: [null],
      store: [''],
      warrantyStartDate: [''],
      warrantyDurationMonths: [12],
      warrantyEndDate: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnChanges(): void {
    if (this.product) {
      this.patchFromProduct(this.product);
    } else {
      this.resetForm();
    }
    this.currentStep = 1;
  }

  goToStep(step: number): void { this.currentStep = step; }

  nextStep(): void {
    if (this.currentStep === 1 && this.isBasicInvalid) {
      ['name', 'brand', 'category'].forEach(name => this.ProductForm.get(name)?.markAsTouched());
      return;
    }
    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep(): void { if (this.currentStep > 1) this.currentStep--; }

  get isBasicInvalid(): boolean {
    return ['name', 'brand', 'category'].some(name => this.ProductForm.get(name)?.invalid);
  }

  onProductImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.productImagePreview = reader.result as string; };
    reader.readAsDataURL(file);
  }

  removeProductImage(): void { this.productImagePreview = null; }

  onInvoiceSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.invoiceFileName = file.name;
  }

  private patchFromProduct(product: Product): void {
    this.ProductForm.patchValue({ ...product });
    this.productImagePreview = product.productImageUrl || null;
    this.invoiceFileName = product.invoiceUrl ? 'Invoice on file' : null;
  }

  private resetForm(): void {
    this.ProductForm.reset({
      name: '', brand: '', category: 'Phone', modelNumber: '', serialNumber: '',
      purchaseDate: '', purchasePrice: null, store: '',
      warrantyStartDate: '', warrantyDurationMonths: 12, warrantyEndDate: '', notes: '',
    });
    this.productImagePreview = null;
    this.invoiceFileName = null;
  }

  saveProduct(): void {
    if (this.ProductForm.invalid) {
      this.ProductForm.markAllAsTouched();
      this.currentStep = 1;
      return;
    }

    const value = this.ProductForm.value;

    const result: Product = {
      id: this.product?.id ?? 'PRD' + Date.now(),
      name: value.name,
      brand: value.brand,
      category: value.category,
      modelNumber: value.modelNumber,
      serialNumber: value.serialNumber,
      purchaseDate: value.purchaseDate,
      purchasePrice: value.purchasePrice ?? 0,
      store: value.store,
      warrantyStartDate: value.warrantyStartDate,
      warrantyDurationMonths: value.warrantyDurationMonths,
      warrantyEndDate: value.warrantyEndDate,
      notes: value.notes,
      productImageUrl: this.productImagePreview ?? '',
      invoiceUrl: this.product?.invoiceUrl ?? '',
    };

    this.save.emit(result);
  }
}