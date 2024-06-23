import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
