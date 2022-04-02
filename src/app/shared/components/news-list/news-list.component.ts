import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { News } from '../../../core/domain/models/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent {
  @Input() news: News[] = [];
  @Output() favoriteToggled = new EventEmitter<number>();

  toggleFavorite(newId: number) {
    this.favoriteToggled.emit(newId);
  }
}
