import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { News } from '../../../core/domain/models/news';

export interface FavoriteNewsState {
  newsList: News[];
  page: number;
  pageSize: number;
  itemsCount: number;
}

function createInitialState(): FavoriteNewsState {
  return {
    newsList: [],
    pageSize: 8,
    page: 1,
    itemsCount: 10,
  };
}

@Injectable()
@StoreConfig({ name: 'favorites' })
export class FavoriteNewsStore extends Store<FavoriteNewsState> {
  constructor() {
    super(createInitialState());
  }
}
