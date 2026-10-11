import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardView } from './dashboard/dashboard-view/dashboard-view';
import { MyProductsView } from './myproducts/myproducts-view/myproducts-view';
import { ExpiredView } from './expired/expired-view/expired-view';
import { SettingsView } from './settings/settings-view/settings-view';
import { ExpiringView } from './expiring/expiring-view/expiring-view';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component : DashboardView
  },
  {
    path : 'myproducts',
    component : MyProductsView
  },
  {
    path : 'expiring',
    component : ExpiringView
  },
   {
    path : 'expired',
    component : ExpiredView
  }, {
    path : 'settings',
    component : SettingsView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
