import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';

import { MainLayoutComponent } from './ui/layout';
import { FavoritesPageComponent, NewsPageComponent } from './ui/pages';
import { SharedModule } from '../../shared/shared.module';
import { NewsQuery, NewsService, NewsStore } from './store';

@NgModule({
  imports: [CommonModule, NewsRoutingModule, SharedModule],
  declarations: [
    MainLayoutComponent,
    NewsPageComponent,
    FavoritesPageComponent,
  ],
  providers: [NewsStore, NewsQuery, NewsService],
})
export class NewsModule {}
