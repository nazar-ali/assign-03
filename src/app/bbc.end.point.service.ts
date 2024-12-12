import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as cheerio from 'cheerio';

interface Headline {
  headline: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class BbcService {
  constructor(private http: HttpClient) {}

  fetchBbcHeadlines(): Observable<Headline[]> {
    const bbcUrl = '/api';

    return this.http
      .get<string>(bbcUrl, { responseType: 'text' as 'json' })
      .pipe(
        map((html: string) => {
          const $ = cheerio.load(html);
          const headlines: { headline: string; description: string }[] = [];
          $('.media__content').each((index: number, element: any) => {
            const headline = $(element).find('.media__title a').text().trim();
            const description = $(element)
              .find('.media__summary')
              .text()
              .trim();
            if (headline && description) {
              headlines.push({ headline, description });
            }
          });
          return headlines;
        }),
        catchError((error: unknown) => {
          console.error('Error fetching BBC headlines:', error);
          throw error;
        })
      );
  }
}
