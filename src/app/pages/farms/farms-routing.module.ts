import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { CreateProductComponent } from './products/create/create.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'update/:id',
    component: CreateComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: ':idFarm/products/create',
    component: CreateProductComponent
  },
  {
    path: ':idFarm/products/create/:id',
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmsRoutingModule { }
