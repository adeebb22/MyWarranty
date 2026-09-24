import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Layout } from './layout/layout';
const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
        {
            path: '',
            loadChildren: () => import('../main/main-module').then(m => m.MainModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}