import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../guards/login.guard';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'complete-profile',
    component: CompleteProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
