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
  story_id: number;
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
  news: News[];
};

@Injectable({ providedIn: 'root' })
export class HackernewsService {
  constructor(public readonly http: HttpClient) {}

  async fetchNewsByName({
    page = 1,
    query,
  }: FetchNewsByNameParams): Promise<PaginatedResponse> {
    const parsedPage = page - 1;
    const URL = `${environment.HACKER_NEWS_URL}?query=${query}&page=${parsedPage}`;

    const response = await firstValueFrom(
      this.http.get<FetchNewsByNameResponse>(URL)
    );

    const news: News[] = response.hits.map(hitResponseToNews);

    return {
      pageSize: response.hitsPerPage,
      pageCount: response.nbPages,
      page: response.page + 1,
      news,
    };
  }
}

const hitResponseToNews = (hit: HitResponse): News => {
  return {
    id: hit.story_id,
    author: hit.author,
    createdAt: new Date(hit.created_at),
    isFavorite: false,
    title: hit.story_title,
    url: hit.story_url,
  };
};
