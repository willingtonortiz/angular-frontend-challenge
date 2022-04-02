import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';

import { MainLayoutComponent } from './ui/layout';
import { FavoritesPageComponent, NewsPageComponent } from './ui/pages';
import { SharedModule } from '../../shared/shared.module';
import { NewsQuery, NewsService, NewsStore } from './store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NewsRoutingModule, SharedModule],
  declarations: [
    MainLayoutComponent,
    NewsPageComponent,
    FavoritesPageComponent,
  ],
  providers: [NewsStore, NewsQuery, NewsService],
})
export class NewsModule {}
