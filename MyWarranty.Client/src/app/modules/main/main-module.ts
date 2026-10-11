import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing-module';
import { MyproductsModule } from './myproducts/myproducts-module';
import { DashboardModule } from './dashboard/dashboard-module';
import { ExpiredModule } from './expired/expired-module';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    DashboardModule,
    MyproductsModule,
    FormsModule,
    ExpiredModule
  ]
})
export class MainModule { }