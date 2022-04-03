import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { FavoriteNewsState, FavoriteNewsStore } from './favorites.store';

@Injectable()
export class FavoriteNewsQuery extends Query<FavoriteNewsState> {
  newsList$ = this.select(({ news, page, pageSize }) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;

    return news.slice(start, end);
  });

  page$ = this.select((x) => x.page);
  pageSize$ = this.select((x) => x.pageSize);
  itemsCount$ = this.select((x) => x.itemsCount);

  constructor(protected override store: FavoriteNewsStore) {
    super(store);
  }
}
