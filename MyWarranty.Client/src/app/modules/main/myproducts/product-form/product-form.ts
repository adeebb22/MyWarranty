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
  showInvoicePreview = false;
  productImagePreview: string | null = null;
  invoicePreview: string | null = null;
  invoiceFileName: string | null = null;
  calculatedWarrantyEndDate: string = '';

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
      warrantyStartDate: ['', Validators.required],
      warrantyDuration: [1, [Validators.required, Validators.min(0.5)]],
      warrantyDurationUnit: ['Years', Validators.required],
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
  isPdfDocument(url: string): boolean {
    return url.startsWith('data:application/pdf') ||
      /\.pdf(?:[?#].*)?$/i.test(url);
  }

  isImageDocument(url: string): boolean {
    return url.startsWith('data:image/') ||
      /\.(jpg|jpeg|png|gif|webp)(?:[?#].*)?$/i.test(url);
  }

  openInvoicePreview(): void {
    this.showInvoicePreview = true;
  }

  onInvoiceSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const isPdf = file.type === 'application/pdf';
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) {
      alert('Please select a PDF or image file.');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.invoicePreview = reader.result as string;
      this.invoiceFileName = file.name;
    };

    reader.onerror = () => {
      alert('Unable to read the selected invoice.');
    };

    reader.readAsDataURL(file);
  }

  updateWarrantyEndDate(): void {
    const startValue = this.ProductForm.get('warrantyStartDate')?.value;
    const duration = Number(
      this.ProductForm.get('warrantyDuration')?.value
    );
    const unit = this.ProductForm.get('warrantyDurationUnit')?.value;

    this.calculatedWarrantyEndDate = '';

    if (!startValue || !Number.isFinite(duration) || duration <= 0) {
      return;
    }

    // Years may use decimals, such as 1.5 years.
    // Months and days must be whole numbers.
    if (unit !== 'Years' && !Number.isInteger(duration)) {
      return;
    }

    const [year, month, day] = startValue.split('-').map(Number);

    const startDate = new Date(year, month - 1, day);

    if (
      Number.isNaN(startDate.getTime()) ||
      startDate.getFullYear() !== year ||
      startDate.getMonth() !== month - 1 ||
      startDate.getDate() !== day
    ) {
      return;
    }

    let endDate: Date;

    if (unit === 'Years') {
      // 1.5 years = 18 calendar months.
      endDate = this.addCalendarMonths(
        startDate,
        Math.round(duration * 12)
      );
    } else if (unit === 'Months') {
      endDate = this.addCalendarMonths(startDate, duration);
    } else if (unit === 'Days') {
      endDate = new Date(
        year,
        month - 1,
        day + duration
      );
    } else {
      return;
    }

    this.calculatedWarrantyEndDate = [
      endDate.getFullYear(),
      String(endDate.getMonth() + 1).padStart(2, '0'),
      String(endDate.getDate()).padStart(2, '0')
    ].join('-');
  }

  private addCalendarMonths(startDate: Date, months: number): Date {
    const originalDay = startDate.getDate();

    // Move to the first day to avoid JavaScript month overflow.
    const result = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      1
    );

    result.setMonth(result.getMonth() + months);

    // Keep the date within the target month's valid days.
    const lastDay = new Date(
      result.getFullYear(),
      result.getMonth() + 1,
      0
    ).getDate();

    result.setDate(Math.min(originalDay, lastDay));

    return result;
  }




  private patchFromProduct(product: Product): void {
    const duration = this.getDurationFromDates(
      product.warrantyStartDate,
      product.warrantyEndDate
    );

    this.ProductForm.patchValue({
      ...product,
      warrantyDuration: duration.value,
      warrantyDurationUnit: duration.unit
    });

    this.updateWarrantyEndDate();

    this.productImagePreview = product.productImageUrl || null;
    this.invoicePreview = product.invoiceUrl || null;

    this.invoiceFileName = product.invoiceUrl
      ? 'Existing invoice'
      : null;
  }

  private getDurationFromDates(
    startValue: string,
    endValue: string
  ): { value: number; unit: string } {
    const start = new Date(`${startValue}T00:00:00`);
    const end = new Date(`${endValue}T00:00:00`);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      end < start
    ) {
      return { value: 1, unit: 'Years' };
    }

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      end.getMonth() - start.getMonth();

    const candidate = this.addCalendarMonths(start, months);

    if (candidate.getTime() === end.getTime()) {
      return { value: months, unit: 'Months' };
    }

    const days = Math.round(
      (Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
        Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) /
      86400000
    );

    return { value: days, unit: 'Days' };
  }


  private resetForm(): void {
    this.ProductForm.reset({
      name: '', brand: '', category: 'Phone', modelNumber: '', serialNumber: '',
      purchaseDate: '', purchasePrice: null, store: '',
      warrantyStartDate: '', warrantyDuration: 1,
      warrantyDurationUnit: 'Years', notes: '',
    });
    this.calculatedWarrantyEndDate = '';
    this.productImagePreview = null;
    this.invoiceFileName = null;
    this.invoicePreview = null;
  }

  saveProduct(): void {
    this.updateWarrantyEndDate();

    const durationControl = this.ProductForm.get('warrantyDuration');
    const unitControl = this.ProductForm.get('warrantyDurationUnit');

    const duration = Number(durationControl?.value);
    const unit = unitControl?.value;

    // Years may be decimal; months and days must be whole numbers.
    const invalidDuration =
      !Number.isFinite(duration) ||
      duration <= 0 ||
      (unit !== 'Years' && !Number.isInteger(duration)) ||
      (unit !== 'Years' && duration < 1);

    if (invalidDuration) {
      durationControl?.setErrors({
        ...durationControl.errors,
        invalidDuration: true
      });
    }

    if (
      this.ProductForm.invalid ||
      invalidDuration ||
      !this.calculatedWarrantyEndDate
    ) {
      this.ProductForm.markAllAsTouched();
      this.currentStep = 2;
      return;
    }

    const value = this.ProductForm.value;

    const result: Product = {
      productId: this.product?.productId ?? 0,
      name: value.name,
      brand: value.brand,
      category: value.category,
      modelNumber: value.modelNumber,
      serialNumber: value.serialNumber,
      purchaseDate: value.purchaseDate,
      purchasePrice: value.purchasePrice ?? 0,
      store: value.store,
      warrantyStartDate: value.warrantyStartDate,
      warrantyDuration: Number(value.warrantyDuration),
      warrantyDurationUnit: value.warrantyDurationUnit,
      warrantyEndDate: this.calculatedWarrantyEndDate,
      notes: value.notes,
      productImageUrl: this.productImagePreview ?? '',
      invoiceUrl: this.invoicePreview ?? ''
    };

    this.save.emit(result);
  }
}