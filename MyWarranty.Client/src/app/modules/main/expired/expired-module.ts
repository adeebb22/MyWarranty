import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpiredRoutingModule } from './expired-routing-module';
import { ExpiredView } from './expired-view/expired-view';

@NgModule({
  declarations: [ExpiredView],
  imports: [CommonModule, ExpiredRoutingModule],
})
export class ExpiredModule {}
