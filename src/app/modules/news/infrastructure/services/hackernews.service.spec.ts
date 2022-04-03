import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from '../../../../../environments/environment';

import { HackernewsService } from './hackernews.service';

describe('HackernewsService', () => {
  let service: HackernewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: { get: () => ({}) },
        },
      ],
    });
    service = TestBed.inject(HackernewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the get method with the given query and page', () => {
    const QUERY = 'angular';
    const PAGE = 1;
    const URL = `${environment.HACKER_NEWS_URL}?query=angular&page=0`;
    const FAKE_RESPONSE = { hits: [], page: 0, hitsPerPage: 0, nbPages: 0 };

    spyOn(service.http, 'get').and.returnValue(of(FAKE_RESPONSE));

    service.fetchNewsByQueryAndPage({ page: PAGE, query: QUERY });

    // Expect
    expect(service.http.get).toHaveBeenCalled();
    expect(service.http.get).toHaveBeenCalledWith(URL);
  });
});
