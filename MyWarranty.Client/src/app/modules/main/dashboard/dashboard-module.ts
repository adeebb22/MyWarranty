import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardView } from './dashboard-view/dashboard-view';
import { StatCard } from './stat-card/stat-card';

@NgModule({
  declarations: [DashboardView, StatCard],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
