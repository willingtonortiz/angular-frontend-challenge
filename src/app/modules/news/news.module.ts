import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';

import { MainLayoutComponent } from './ui/layout';
import { FavoritesPageComponent, NewsPageComponent } from './ui/pages';

@NgModule({
  imports: [CommonModule, NewsRoutingModule],
  declarations: [
    MainLayoutComponent,
    NewsPageComponent,
    FavoritesPageComponent,
  ],
})
export class NewsModule {}
