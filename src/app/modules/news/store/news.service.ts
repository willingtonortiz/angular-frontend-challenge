import { Injectable } from '@angular/core';

import { NewsStore } from './news.store';

import { HackernewsService } from '../infrastructure/services/hackernews.service';
import { FavoriteNewsQuery } from './favorites.query';
import { News } from '../../../core/domain/models/news';

const SELECTED_QUERY_KEY = 'SELECTED_QUERY_KEY';

// Contains the application logic for news page
@Injectable()
export class NewsService {
  constructor(
    private readonly hackerNewsService: HackernewsService,
    private readonly newsStore: NewsStore,
    private readonly favoritesQuery: FavoriteNewsQuery
  ) {
    this.initialize();
  }

  initialize() {
    const query = this.getSelectedQueryFromStorage();
    this.newsStore.update({ query });
  }

  async loadNews() {
    const { query } = this.newsStore.getValue();
    if (!query) {
      return;
    }

    this.fetchNewsByQueryAndPage({ query, page: 1 });
  }

  async updateNewsQuery(query: string) {
    // Saving new query to localstorage
    this.saveSelectedQueryToStorage(query);
    this.fetchNewsByQueryAndPage({ query, page: 1 });
  }

  async loadMoreNews() {
    const {
      page: currentPage,
      isLoading,
      pagesCount,
      query,
    } = this.newsStore.getValue();

    if (!query || isLoading) {
      return;
    }

    // Stop loading when end is reached
    const nextPage = currentPage + 1;
    if (nextPage + 1 > pagesCount) {
      return;
    }

    // Set loading to avoid more than one call at a time
    this.newsStore.update({ isLoading: true });

    await this.fetchNewsByQueryAndPage({ query, page: nextPage });

    this.newsStore.update({ isLoading: false });
  }

  mergeNewsWithFavoritesNews(newsList: News[], favoriteNewsList: News[]) {
    return newsList.map((x) => {
      const isFound = favoriteNewsList.find((y) => y.id === x.id);
      if (isFound) {
        x.isFavorite = true;
      }
      return x;
    });
  }

  async fetchNewsByQueryAndPage({
    page,
    query,
  }: {
    query: string;
    page: number;
  }): Promise<void> {
    const { newsList: currentNews } = this.newsStore.getValue();
    const {
      newsList: responseNews,
      pageSize,
      pageCount,
    } = await this.hackerNewsService.fetchNewsByQueryAndPage({ page, query });

    const { newsList: favoriteNews } = this.favoritesQuery.getValue();
    const mergedNews = this.mergeNewsWithFavoritesNews(
      responseNews,
      favoriteNews
    );

    let newsList: News[] = [];
    if (page === 1) {
      newsList = mergedNews;
    } else {
      newsList = [...currentNews, ...mergedNews];
    }

    this.newsStore.update({
      newsList,
      page,
      pagesCount: pageCount,
      pageSize,
      query,
    });
  }

  getSelectedQueryFromStorage(): string | null {
    const selectedQuery = localStorage.getItem(SELECTED_QUERY_KEY);
    if (!selectedQuery) {
      return null;
    }

    return selectedQuery;
  }

  saveSelectedQueryToStorage(query: string) {
    localStorage.setItem(SELECTED_QUERY_KEY, query);
  }
}
