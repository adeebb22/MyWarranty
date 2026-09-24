import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyproductsRoutingModule } from './myproducts-routing-module';
import { MyProductsView } from './myproducts-view/myproducts-view';
import { ProductCard } from './product-card/product-card';
import { ProductForm } from './product-form/product-form';
import { ProductDetails } from './product-details/product-details';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyProductsView, ProductCard, ProductForm, ProductDetails],
  imports: [CommonModule, MyproductsRoutingModule,ReactiveFormsModule,FormsModule],
})
export class MyproductsModule {}
