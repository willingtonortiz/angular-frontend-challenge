import { Injectable } from '@angular/core';
import { News } from '../../../core/domain/models/news';

import { FavoriteNewsStore } from './favorites.store';

const FAVORITE_NEWS_KEY = 'FAVORITE_NEWS_KEY';

// Contains the application logic for favorites-page
@Injectable()
export class FavoriteNewsService {
  constructor(private readonly favoritesStore: FavoriteNewsStore) {
    this.initialize();
  }

  initialize() {
    const news = this.getFavoritesFromStorage();

    this.favoritesStore.update({ news, itemsCount: news.length });
  }

  addFavoriteNews(news: News) {
    const { news: currentNews } = this.favoritesStore.getValue();

    const favoriteNews: News = { ...news, isFavorite: true };
    const newsList = [...currentNews, favoriteNews];

    // Updating store
    this.updateNews(newsList);
    this.adjustPageOnAdd();

    // Saving to storage
    this.saveSelectedQueryToStorage(newsList);
  }

  removeFavoriteNews(news: News) {
    const { news: currentNews } = this.favoritesStore.getValue();

    // Updating store
    const newsList = currentNews.filter((x) => x.id !== news.id);
    this.updateNews(newsList);
    this.adjustPageOnRemove();

    // Saving to storage
    this.saveSelectedQueryToStorage(newsList);
  }

  updateNews(newsList: News[]) {
    const itemsCount = newsList.length;
    this.favoritesStore.update({ news: newsList, itemsCount });
  }

  adjustPageOnAdd() {
    const { itemsCount, page, pageSize } = this.favoritesStore.getValue();

    if (page <= 0 && itemsCount > 1) {
      this.favoritesStore.update({ page: 1 });
    }
  }

  adjustPageOnRemove() {
    const { itemsCount, page, pageSize } = this.favoritesStore.getValue();

    if (Math.ceil(itemsCount / pageSize) < page) {
      this.favoritesStore.update({ page: page - 1 });
    }
  }

  updatePage(page: number) {
    this.favoritesStore.update({ page });
  }

  getFavoritesFromStorage(): News[] {
    const favoriteNewsStr = localStorage.getItem(FAVORITE_NEWS_KEY);
    if (!favoriteNewsStr) {
      return [];
    }
    const favoritesList: News[] = JSON.parse(favoriteNewsStr);

    return favoritesList.map((x) => ({
      ...x,
      createdAt: new Date(x.createdAt),
    }));
  }

  saveSelectedQueryToStorage(favoriteNews: News[]) {
    localStorage.setItem(FAVORITE_NEWS_KEY, JSON.stringify(favoriteNews));
  }
}
