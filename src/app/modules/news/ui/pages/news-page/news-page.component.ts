import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { News } from '../../../../../core/domain/models/news';

import { FavoriteNewsService, NewsQuery, NewsService } from '../../../store';

const FRAMEWORKS = [
  { label: 'Angular', value: 'angular', image: 'assets/icon-angular.png' },
  { label: 'Reactjs', value: 'reactjs', image: 'assets/icon-react.png' },
  { label: 'Vuejs', value: 'vuejs', image: 'assets/icon-vue.png' },
];

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
})
export class NewsPageComponent implements OnInit {
  news = this.newsQuery.newsList$;
  frameworkInput = new FormControl();
  frameworks = FRAMEWORKS;

  constructor(
    @Inject(DOCUMENT)
    private readonly document: Document,
    private readonly newsQuery: NewsQuery,
    private readonly newsService: NewsService,
    private readonly favoritesService: FavoriteNewsService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = this.document.documentElement.scrollTop;
    const offsetHeight = this.document.documentElement.offsetHeight;
    const scrollHeight = this.document.documentElement.scrollHeight;

    if (scrollHeight - (scrollTop + offsetHeight) < 500) {
      this.newsService.loadMoreNews();
    }
  }

  ngOnInit(): void {
    this.loadSelectedFramework();

    this.newsService.loadNews();

    this.frameworkInput.valueChanges.subscribe((x) => {
      this.newsService.updateNewsQuery(x.value);
    });
  }

  loadSelectedFramework() {
    const query = this.newsQuery.selectedQuery;
    if (!query) {
      return;
    }

    const framework = this.frameworks.find((x) => x.value === query);
    this.frameworkInput.setValue(framework);
  }

  toggleFavorite(news: News) {
    this.favoritesService.toggleFavoriteNews(news);
  }
}
