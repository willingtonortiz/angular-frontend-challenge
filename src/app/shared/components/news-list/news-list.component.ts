import { Component, EventEmitter, Input, Output } from '@angular/core';

import { News } from '../../../core/domain/models/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent {
  @Input() news: News[] = [];
  @Output() favoriteToggled = new EventEmitter<News>();

  toggleFavorite(news: News) {
    this.favoriteToggled.emit(news);
  }
}
