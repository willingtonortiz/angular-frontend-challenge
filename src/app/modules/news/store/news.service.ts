import { Injectable } from '@angular/core';

import { NewsQuery } from './news.query';
import { NewsStore } from './news.store';

import { HackernewsService } from '../infrastructure/services/hackernews.service';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsStore: NewsStore,
    private readonly newsQuery: NewsQuery,
    private readonly hackerNewsService: HackernewsService
  ) {}

  async loadNews() {
    // TODO: Load selected filter from localstorage
    // TODO: Avoid loading when not selected

    const { news, pageSize, pageCount, page } =
      await this.hackerNewsService.fetchNewsByName({
        page: 1,
        query: 'angular',
      });

    this.newsStore.update({
      news,
      page: page,
      pagesCount: pageCount,
      pageSize,
    });
  }

  async updateNewsQuery(query: string) {
    // TODO: Save selected filter to localstorage

    const { news, pageSize, pageCount, page } =
      await this.hackerNewsService.fetchNewsByName({ page: 1, query });

    this.newsStore.update({
      news,
      page: page,
      pagesCount: pageCount,
      pageSize,
    });
  }

  async loadMoreNews() {
    const {
      page: currentPage,
      isLoading,
      news: currentNews,
    } = this.newsStore.getValue();

    if (isLoading) {
      return;
    }

    // Set loading to avoid more than one call at a time
    this.newsStore.update({ isLoading: true });

    const { news, pageSize, pageCount, page } =
      await this.hackerNewsService.fetchNewsByName({
        page: currentPage + 1,
        query: 'angular',
      });

    // Adding new news
    this.newsStore.update({
      news: [...currentNews, ...news],
      page: page,
      pagesCount: pageCount,
      pageSize,
      isLoading: false,
    });
  }
}
