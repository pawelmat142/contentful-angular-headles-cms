import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, switchMap } from 'rxjs';
import { ContentfulRequest, ContentfulRespone } from '../model/contentful.interface';
import { Translate } from './translate.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private readonly BASE_URL = environment.api.baseUrl;
  private readonly ACCESS_TOKEN = environment.api.accessToken;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly translate: Translate,
  ) { }

  getEntries$(request?: ContentfulRequest): Observable<ContentfulRespone> {
    return this.translate.currentLang$.pipe(
      switchMap(lang => {
      let url = `${this.BASE_URL}?access_token=${this.ACCESS_TOKEN}`

      if (request?.contentType) {
        let contentType: string = request.contentType
        url += `&content_type=${contentType}`
      }
      if (lang?.locale) {
        url = `${url}&locale=${lang.locale}`
      }

      return this.httpClient.get<ContentfulRespone>(url)
    }), shareReplay(1))
  }

}