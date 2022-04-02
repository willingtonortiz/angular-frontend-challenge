import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { News } from '../../../core/domain/models/news';

export interface NewsState {
  news: News[];
  page: number;
  pagesCount: number;
  pageSize: number;
  isLoading: boolean;
}

export function createInitialState(): NewsState {
  return {
    pageSize: 0,
    pagesCount: 0,
    page: 0,
    news: [],
    isLoading: false,
  };
}

@Injectable()
@StoreConfig({ name: 'news' })
export class NewsStore extends Store<NewsState> {
  constructor() {
    super(createInitialState());
  }
}
