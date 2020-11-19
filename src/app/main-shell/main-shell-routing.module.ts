import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainShellComponent } from './main-shell/main-shell.component';

const routes: Routes = [
  {
    path: '',
    component: MainShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainShellRoutingModule { }
