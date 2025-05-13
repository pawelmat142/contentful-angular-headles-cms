import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, shareReplay, switchMap, timer } from 'rxjs';
import { ContentfulAssetPublishResponse, ContentfulAssetResponse, ContentfulRequest, ContentfulRespone, ContentfulUploadResponse } from '../model/contentful.interface';
import { Translate } from './translate.service';
import { environment } from '../environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';
import { ContentUtil } from '../utils/content.util';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private readonly BASE_URL = environment.api.baseUrl;
  private readonly ACCESS_TOKEN = environment.api.accessToken;
  private readonly spaceId = environment.api.spaceId;
  private readonly environmentId = environment.api.environmentId;

  private readonly uploadUrl = `https://upload.contentful.com/spaces/${this.spaceId}/uploads`;
  private readonly baseUrl = `https://api.contentful.com/spaces/${this.spaceId}/environments/${this.environmentId}`

  private readonly processAssetDelay = 300

  constructor(
    private readonly httpClient: HttpClient,
    private readonly translate: Translate,
    private readonly translateService: TranslateService,
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



  public uploadFiles$(files: File[], name: string): Observable<{ fileName: string; url?: string; error?: string }[]> {
    return this.getToken$().pipe(
      switchMap(cmaToken => forkJoin(files.map(file => this.uploadFile$(file, cmaToken, name)))),
    )
  }

  private getToken$(): Observable<string> {
    return this.getEntries$({ contentType: 'cmaToken' }).pipe(map(result => ContentUtil.extractToken(result)))
  }

  public uploadFile$(file: File, cmaToken: string, filename?: string): Observable<{ fileName: string; url?: string; error?: string }> {
    if (filename) {
      file = new File([file], `${filename}-${this.prepareUniqueId()}`, {
        type: file.type
      })
    }
    return this.upload(file, cmaToken).pipe(
      switchMap(uploadResponse => this.createAsset(file, uploadResponse, cmaToken)),
      switchMap(assetResponse => this.processAsset(assetResponse, cmaToken)),
      switchMap(assetResponse => this.fetchAsset(assetResponse, cmaToken)),
      switchMap(fetchAssetResponse => this.publishAsset(fetchAssetResponse, cmaToken)),
      map(publishResponse => this.prepareAssetUrl(publishResponse)),
      map(url => ({
          fileName: file.name,
          url
      })),
      catchError(error => {
        return of({
          fileName: file.name,
          error: `${this.translateService.instant('form.upload.error')} ${file.name}`
        });
      })
    )
  }

  private upload(file: File, cmaToken: string): Observable<ContentfulUploadResponse> {
    return this.httpClient.post<ContentfulUploadResponse>(this.uploadUrl, file, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${cmaToken}`,
        'Content-Type': 'application/octet-stream',
      })
    })
  }

  private createAsset(file: File, uploadResponse: ContentfulUploadResponse, cmaToken: string): Observable<ContentfulAssetResponse> {
    return this.httpClient.post<ContentfulAssetResponse>(`${this.baseUrl}/assets`, this.prepareAssetPayload(file, uploadResponse), {
      headers: new HttpHeaders({
        Authorization: `Bearer ${cmaToken}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
      }),
    })
  }

  private processAsset(assetResponse: ContentfulAssetResponse, cmaToken: string): Observable<ContentfulAssetResponse> {
    return this.httpClient.put<null>(`${this.baseUrl}/assets/${assetResponse.sys.id}/files/en-US/process`, null, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${cmaToken}`,
      }),
    }).pipe(switchMap(() => timer(this.processAssetDelay).pipe(map(() => (assetResponse)))))
  }

  private fetchAsset(assetResponse: ContentfulAssetResponse, cmaToken: string): Observable<ContentfulAssetResponse> {
    return this.httpClient.get<ContentfulAssetResponse>(`${this.baseUrl}/assets/${assetResponse.sys.id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${cmaToken}`,
      }),
    })
  }

  private publishAsset(assetResponse: ContentfulAssetResponse, cmaToken: string): Observable<ContentfulAssetPublishResponse> {
    return this.httpClient.put<ContentfulAssetPublishResponse>(`${this.baseUrl}/assets/${assetResponse.sys.id}/published`, {}, { 
      headers: new HttpHeaders({
        Authorization: `Bearer ${cmaToken}`,
        'X-Contentful-Version': `${assetResponse.sys.version}`,
      })
    })
  }

  private prepareUniqueId(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  private prepareAssetUrl(publishResponse: ContentfulAssetPublishResponse): string {
    return 'https:' + publishResponse.fields.file['en-US'].url
  }

  private prepareAssetPayload(file: File, uploadResponse: ContentfulUploadResponse) {
    return {
      metadata: {
        tags: [{
          sys: {
            type: 'Link',
            linkType: 'Tag',
            id: 'upload'
          },
        }]
      },
      fields: {
        title: {
          'en-US': file.name,
        },
        file: {
          'en-US': {
            uploadFrom: {
              sys: {
                type: 'Link',
                linkType: 'Upload',
                id: uploadResponse.sys.id,
              },
            },
            contentType: file.type,
            fileName: file.name,
          },
        },
      },
    };
  }

}