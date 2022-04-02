import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';

import { MainLayoutComponent } from './ui/layout';
import { FavoritesPageComponent, NewsPageComponent } from './ui/pages';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, NewsRoutingModule, SharedModule],
  declarations: [
    MainLayoutComponent,
    NewsPageComponent,
    FavoritesPageComponent,
  ],
})
export class NewsModule {}
