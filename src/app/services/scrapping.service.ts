import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ScrappingRecord } from '../cors/interfaces/scrapping-record';

@Injectable({
  providedIn: 'root',
})
export class ScrappingService {
  latestRecord$ = new Subject<ScrappingRecord>();
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
}
