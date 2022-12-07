import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FarmsRoutingModule } from './farms-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    FarmsRoutingModule,
    FormsModule
  ]
})
export class FarmsModule { }
