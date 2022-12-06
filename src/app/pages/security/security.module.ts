import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-form/register-form.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    RegisterFormComponent,
    CompleteProfileComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    NbCardModule
  ]
})
export class SecurityModule { }
