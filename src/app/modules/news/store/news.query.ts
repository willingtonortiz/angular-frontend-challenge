import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { NewsState, NewsStore } from './news.store';

@Injectable()
export class NewsQuery extends Query<NewsState> {
  constructor(protected override store: NewsStore) {
    super(store);
  }
}
