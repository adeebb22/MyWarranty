import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpiringRoutingModule } from './expiring-routing-module';
import { ExpiringView } from './expiring-view/expiring-view';

@NgModule({
  declarations: [ExpiringView],
  imports: [CommonModule, ExpiringRoutingModule],
})
export class ExpiringModule {}
