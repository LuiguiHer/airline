import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SignOffComponent } from './sign-off/sign-off.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
},
{
  path: "sign-off",
  component: SignOffComponent,
},
{
  path: "change-password",
  component: ChangePasswordComponent,
},
{
  path: "recover password",
  component: RecoverPasswordComponent,
},{
  path: '',
  redirectTo: 'login'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
