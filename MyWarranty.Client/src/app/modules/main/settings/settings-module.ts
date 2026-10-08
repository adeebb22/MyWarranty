import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing-module';
import { SettingsView } from './settings-view/settings-view';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsView],
  imports: [CommonModule, SettingsRoutingModule,FormsModule],
})
export class SettingsModule {}
