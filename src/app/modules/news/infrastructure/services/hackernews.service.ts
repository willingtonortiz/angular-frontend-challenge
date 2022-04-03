import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { News } from '../../../../core/domain/models/news';

type FetchNewsByNameParams = {
  query: string;
  page: number;
};

type HitResponse = {
  objectID: string;
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
};

type FetchNewsByNameResponse = {
  hits: HitResponse[];
  page: number;
  hitsPerPage: number;
  nbPages: number;
};

type PaginatedResponse = {
  pageCount: number;
  pageSize: number;
  page: number;
  newsList: News[];
};

@Injectable({ providedIn: 'root' })
export class HackernewsService {
  constructor(public readonly http: HttpClient) {}

  async fetchNewsByQueryAndPage({
    page = 1,
    query,
  }: FetchNewsByNameParams): Promise<PaginatedResponse> {
    const parsedPage = page - 1;
    const URL = `${environment.HACKER_NEWS_URL}?query=${query}&page=${parsedPage}`;

    const response = await firstValueFrom(
      this.http.get<FetchNewsByNameResponse>(URL)
    );

    const filteredNews = response.hits.filter(removeUncompletedNews);
    const newsList: News[] = filteredNews.map(hitResponseToNews);

    return {
      pageSize: response.hitsPerPage,
      pageCount: response.nbPages,
      page: response.page + 1,
      newsList,
    };
  }
}

const removeUncompletedNews = (hit: HitResponse): boolean => {
  return (
    !!hit.author && !!hit.story_title && !!hit.story_url && !!hit.created_at
  );
};

const hitResponseToNews = (hit: HitResponse): News => {
  return {
    id: hit.objectID,
    author: hit.author,
    createdAt: new Date(hit.created_at),
    isFavorite: false,
    title: hit.story_title,
    url: hit.story_url,
  };
};
