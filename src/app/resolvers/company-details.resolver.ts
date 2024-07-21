import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ScrappingService } from '../services/scrapping.service';
import { ScrappingRecord } from '../cors/interfaces/scrapping-record';
import { Observable } from 'rxjs';

export const companyDetailsResolver: ResolveFn<ScrappingRecord> = (
  route,
  state
): Observable<ScrappingRecord> => {
  const service = inject(ScrappingService);
  let data = service.latestRecord$.value;
  const isEmpty = !Object.keys(data).length;
  if (isEmpty) {
    return service.getCompanyById(route.paramMap.get('id')!);
  }
  return service.latestRecord$;
};
