import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './assets/error/error.component';
import { IndexComponent } from './assets/index/index.component';

const routes: Routes = [{
  path: 'index',
  component: IndexComponent,
},
{
  path: '',
  pathMatch: 'full',
  redirectTo: '/index'
},{
  path: 'security',
  loadChildren: () => import('./modules/security/security.module').then(m => m.SeguridadModule)
},{
  path: 'admin',
  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
},{
  path: 'airport',
  loadChildren: () => import('./modules/airport/airport.module').then(m => m.AirportModule)
},{
  path: 'flight',
  loadChildren: () => import('./modules/flight/flight.module').then(m => m.FlightModule)
},{
  path: 'route',
  loadChildren: () => import('./modules/route/route.module').then(m => m.RouteModule)
},

{
  path: 'error',
  component: ErrorComponent,
},{
  path: '**',
  redirectTo: '/error'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
