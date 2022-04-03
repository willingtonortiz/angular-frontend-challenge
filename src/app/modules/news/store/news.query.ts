import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { NewsState, NewsStore } from './news.store';

@Injectable()
export class NewsQuery extends Query<NewsState> {
  newsList$ = this.select((x) => x.newsList);

  constructor(protected override store: NewsStore) {
    super(store);
  }

  get selectedQuery() {
    const { query } = this.getValue();

    return query;
  }
}
