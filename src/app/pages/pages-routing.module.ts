import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      canActivate: [AuthenticationGuard],
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      canActivate: [AuthenticationGuard],
      component: DashboardComponent,
    },
    {
      path: 'security',
      loadChildren: () => import('./security/security.module')
        .then(m => m.SecurityModule),
    },
    {
      path: 'users',
      canActivate: [AuthenticationGuard],
      loadChildren: () => import('./usuarios/usuarios.module')
        .then(m => m.UsuariosModule),
    },
    {
      path: 'farms',
      canActivate: [AuthenticationGuard],
      loadChildren: () => import('./farms/farms.module')
        .then(m => m.FarmsModule),
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module')
        .then(m => m.ProductsModule),
    },
    {
      path: 'permissions',
      canActivate: [AdminGuard],
      loadChildren: () => import('./permissions/permissions.module')
        .then(m => m.PermissionsModule),
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
