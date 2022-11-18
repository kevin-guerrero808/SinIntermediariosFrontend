import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListarComponent
  },
  {
    path: 'create',
    component: CrearComponent
  },
  {
    path: 'update/:id',
    component: CrearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
