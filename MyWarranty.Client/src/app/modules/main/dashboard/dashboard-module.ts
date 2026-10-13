import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardView } from './dashboard-view/dashboard-view';
import { StatCard } from './stat-card/stat-card';
import { MyproductsModule } from '../myproducts/myproducts-module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardView, StatCard],
  imports: [CommonModule, DashboardRoutingModule,MyproductsModule,RouterModule],
})
export class DashboardModule {}
