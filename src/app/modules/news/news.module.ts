import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';

import { MainLayoutComponent } from './ui/layout';
import { FavoritesPageComponent, NewsPageComponent } from './ui/pages';
import { SharedModule } from '../../shared/shared.module';
import {
  FavoriteNewsQuery,
  FavoriteNewsService,
  FavoriteNewsStore,
  NewsQuery,
  NewsService,
  NewsStore,
} from './store';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NewsRoutingModule, SharedModule],
  declarations: [
    MainLayoutComponent,
    NewsPageComponent,
    FavoritesPageComponent,
  ],
  providers: [
    NewsStore,
    NewsQuery,
    NewsService,
    FavoriteNewsStore,
    FavoriteNewsQuery,
    FavoriteNewsService,
  ],
})
export class NewsModule {}
