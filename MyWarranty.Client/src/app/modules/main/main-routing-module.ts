import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardView } from './dashboard/dashboard-view/dashboard-view';
import { MyProductsView } from './myproducts/myproducts-view/myproducts-view';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
