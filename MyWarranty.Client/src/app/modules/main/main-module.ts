import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing-module';
import { MyproductsModule } from './myproducts/myproducts-module';
import { DashboardModule } from './dashboard/dashboard-module';
import { ExpiringModule } from './expiring/expiring-module';
import { ExpiredModule } from './expired/expired-module';

@NgModule({
  imports: [CommonModule,
     MainRoutingModule,
      DashboardModule,
       MyproductsModule,
        ExpiringModule,
      ExpiredModule]
})
export class MainModule { }
