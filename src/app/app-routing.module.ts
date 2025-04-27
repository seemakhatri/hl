import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
