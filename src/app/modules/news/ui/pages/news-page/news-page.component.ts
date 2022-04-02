import { Component, OnInit } from '@angular/core';
import { News } from '../../../../../core/domain/models/news';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
})
export class NewsPageComponent implements OnInit {
  news: News[] = [];

  constructor() {}

  ngOnInit(): void {}

  toggleFavorite(newId: number) {
    console.log(newId);
  }
}
