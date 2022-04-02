import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { MainLayoutComponent } from './ui/layout';
import { FavoritesPageComponent, NewsPageComponent } from './ui/pages';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full',
      },
      {
        path: 'news',
        component: NewsPageComponent,
      },
      {
        path: 'favorites',
        component: FavoritesPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
