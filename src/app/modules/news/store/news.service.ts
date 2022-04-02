import { Injectable } from '@angular/core';

import { NewsStore } from './news.store';

import { HackernewsService } from '../infrastructure/services/hackernews.service';

const SELECTED_QUERY_KEY = 'SELECTED_QUERY_KEY';

// Contains the application logic for news page
@Injectable()
export class NewsService {
  constructor(
    private readonly newsStore: NewsStore,
    private readonly hackerNewsService: HackernewsService
  ) {
    this.initialize();
  }

  initialize() {
    const query = this.getSelectedQuery();
    this.newsStore.update({ query });
  }

  async loadNews() {
    const { query } = this.newsStore.getValue();
    if (!query) {
      return;
    }

    const { news, pageSize, pageCount, page } =
      await this.hackerNewsService.fetchNewsByName({ page: 1, query });

    this.newsStore.update({
      news,
      page,
      pagesCount: pageCount,
      pageSize,
      query,
    });
  }

  async updateNewsQuery(query: string) {
    // Saving new query to localstorage
    this.saveSelectedQuery(query);

    const { news, pageSize, pageCount, page } =
      await this.hackerNewsService.fetchNewsByName({ page: 1, query });

    this.newsStore.update({ news, page, pagesCount: pageCount, pageSize });
  }

  async loadMoreNews() {
    const {
      page: currentPage,
      isLoading,
      news: currentNews,
      pagesCount,
      query,
    } = this.newsStore.getValue();

    if (!query) {
      return;
    }

    // Stop loading when end is reached
    const nextPage = currentPage + 1;
    if (nextPage + 1 > pagesCount) {
      return;
    }

    if (isLoading) {
      return;
    }

    // Set loading to avoid more than one call at a time
    this.newsStore.update({ isLoading: true });

    const { news, pageSize, pageCount, page } =
      await this.hackerNewsService.fetchNewsByName({ page: nextPage, query });

    // Adding new news
    this.newsStore.update({
      news: [...currentNews, ...news],
      page,
      pagesCount: pageCount,
      pageSize,
      isLoading: false,
    });
  }

  getSelectedQuery(): string | null {
    const selectedQuery = localStorage.getItem(SELECTED_QUERY_KEY);
    if (!selectedQuery) {
      return null;
    }

    return selectedQuery;
  }

  saveSelectedQuery(query: string) {
    localStorage.setItem(SELECTED_QUERY_KEY, query);
  }
}
