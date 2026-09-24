import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './layout/layout';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { CoreRoutingModule } from './core-routing-module';

@NgModule({
  declarations: [Layout, Navbar, Sidebar],
  imports: [CommonModule, RouterOutlet,CoreRoutingModule],
})
export class CoreModule {
  
}
