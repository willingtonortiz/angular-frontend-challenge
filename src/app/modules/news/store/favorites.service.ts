import { Injectable } from '@angular/core';
import { News } from '../../../core/domain/models/news';

import { FavoriteNewsStore } from './favorites.store';
import { NewsStore } from './news.store';

const FAVORITE_NEWS_KEY = 'FAVORITE_NEWS_KEY';

// Contains the application logic for favorites-page
@Injectable()
export class FavoriteNewsService {
  constructor(
    private readonly favoritesStore: FavoriteNewsStore,
    private readonly newsStore: NewsStore
  ) {
    this.initialize();
  }

  initialize() {
    const newsList = this.getFavoritesFromStorage();

    this.favoritesStore.update({ newsList, itemsCount: newsList.length });
  }

  toggleFavoriteNews(news: News) {
    if (news.isFavorite) {
      this.removeFavoriteNews(news);
    } else {
      this.addFavoriteNews(news);
    }
  }

  addFavoriteNews(news: News) {
    const { newsList: currentNews } = this.favoritesStore.getValue();

    const favoriteNews: News = { ...news, isFavorite: true };
    const newsList = [...currentNews, favoriteNews];

    // Updating store
    this.updateNews(newsList);
    this.adjustPageOnAdd();
    this.newsStore.toggleFavoriteById(news.id);

    // Saving to storage
    this.saveSelectedQueryToStorage(newsList);
  }

  removeFavoriteNews(news: News) {
    const { newsList: currentNews } = this.favoritesStore.getValue();

    // Updating store
    const newsList = currentNews.filter((x) => x.id !== news.id);
    this.updateNews(newsList);
    this.adjustPageOnRemove();
    this.newsStore.toggleFavoriteById(news.id);

    // Saving to storage
    this.saveSelectedQueryToStorage(newsList);
  }

  updateNews(newsList: News[]) {
    const itemsCount = newsList.length;
    this.favoritesStore.update({ newsList, itemsCount });
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
