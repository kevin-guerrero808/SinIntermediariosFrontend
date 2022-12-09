import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { NbIconModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ListComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NbIconModule
  ],
  exports: [
    ProductItemComponent
  ]
})
export class ProductsModule { }
