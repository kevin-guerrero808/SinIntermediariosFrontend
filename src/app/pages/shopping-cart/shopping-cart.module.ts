import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { DetailComponent } from './detail/detail.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    NbCardModule
  ]
})
export class ShoppingCartModule { }
