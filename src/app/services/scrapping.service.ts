import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ScrappingRecord } from '../cors/interfaces/scrapping-record';

@Injectable({
  providedIn: 'root',
})
export class ScrappingService {
  latestRecord$ = new BehaviorSubject<ScrappingRecord>({} as ScrappingRecord);
  constructor(private _http: HttpClient) {}

  fetchDetails(url: string): Observable<ScrappingRecord> {
    return this._http.post<ScrappingRecord>(
      `${environment.API_URL}/fetch-details`,
      {
        url: url,
      }
    );
  }

  getAllCompaniesRecords(): Observable<ScrappingRecord[]> {
    return this._http.get<ScrappingRecord[]>(
      `${environment.API_URL}/all-companies-records`
    );
  }

  deletedRecords(items: string[]) {
    return this._http.delete(`${environment.API_URL}/remove-companies`, {
      body: { items: items },
    });
  }

  getScreenshot(url: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'image/png');
    return this._http.post(
      `${environment.API_URL}/url-to-image`,
      { url: url },
      {
        headers,
        responseType: 'blob',
      }
    );
  }

  getCompanyById(id: string): Observable<ScrappingRecord> {
    return this._http.get<ScrappingRecord>(
      `${environment.API_URL}/company-record/${id}`
    );
  }
}
