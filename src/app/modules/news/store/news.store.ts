import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { News } from '../../../core/domain/models/news';

export interface NewsState {
  newsList: News[];
  page: number;
  pagesCount: number;
  pageSize: number;
  isLoading: boolean;
  query: string | null;
}

function createInitialState(): NewsState {
  return {
    pageSize: 0,
    pagesCount: 0,
    page: 0,
    newsList: [],
    isLoading: false,
    query: null,
  };
}

@Injectable()
@StoreConfig({ name: 'news' })
export class NewsStore extends Store<NewsState> {
  constructor() {
    super(createInitialState());
  }

  toggleFavoriteById(newsId: string) {
    const { newsList } = this.getValue();
    const updatedList = newsList.map((x) => {
      if (x.id === newsId) {
        x.isFavorite = !x.isFavorite;
      }

      return x;
    });

    this.update({ newsList: updatedList });
  }
}
