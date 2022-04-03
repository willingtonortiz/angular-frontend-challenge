import { Component } from '@angular/core';

import { News } from '../../../../../core/domain/models/news';
import { FavoriteNewsQuery, FavoriteNewsService } from '../../../store';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css'],
})
export class FavoritesPageComponent {
  news$ = this.favoritesQuery.newsList$;
  page$ = this.favoritesQuery.page$;
  pageSize$ = this.favoritesQuery.pageSize$;
  itemCount$ = this.favoritesQuery.itemsCount$;

  constructor(
    private readonly favoritesQuery: FavoriteNewsQuery,
    private readonly favoritesService: FavoriteNewsService
  ) {}

  changePage(page: number) {
    this.favoritesService.updatePage(page);
  }

  removeFromFavorite(news: News) {
    this.favoritesService.removeFavoriteNews(news);
  }
}
