import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FarmsRoutingModule } from './farms-routing.module';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { CreateProductComponent } from './products/create/create.component';
import { ProductsModule } from '../products/products.module';



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    DetailComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    FarmsRoutingModule,
    FormsModule,
    ProductsModule
  ]
})
export class FarmsModule { }
