import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ScrappingRecord } from '../cors/interfaces/scrapping-record';
import { environment } from 'src/environments/environment';

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
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/png")
    headers.append('Accept', 'image/png');
    headers.append('Access-Control-Allow-Origin', '*');

    return this._http.post(
      `${environment.API_URL}/url-to-image`,
      { url: url },
      {
        headers: headers,
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
