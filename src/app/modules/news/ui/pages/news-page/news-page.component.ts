import { Component, OnInit } from '@angular/core';
import { News } from '../../../../../core/domain/models/news';

import { NewsQuery, NewsStore } from '../../../store';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
})
export class NewsPageComponent implements OnInit {
  news: News[] = [];

  constructor(
    private readonly newsStore: NewsStore,
    private readonly newsQuery: NewsQuery
  ) {}

  ngOnInit(): void {}

  toggleFavorite(newId: number) {
    console.log(newId);
  }
}
