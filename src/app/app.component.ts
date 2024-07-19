import { Component } from '@angular/core';
import { ScrappingService } from './services/scrapping.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web-scrapping';
  isInvalid = false;
  searchControl = new FormControl();
  isLoading = false;
  constructor(private _scrappingService: ScrappingService) {}

  fetchDetails() {
    const searcKey = this.searchControl.value;
    console.log(this.searchControl.value);
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (urlPattern.test(searcKey)) {
      this.isLoading = true;
      this._scrappingService
        .fetchDetails(searcKey)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (res) => {
            if(res.url){
              this._scrappingService.latestRecord$.next(res);
              console.log(res);
              Swal.fire('Success','Record Successfully Added','success')
            }else{
              Swal.fire('Success','Record Updated ','info')

            }
            this.searchControl.reset()
          },
          error: (e: HttpErrorResponse) => {
            Swal.fire('Error',e.statusText,'error')
          },
        });
    } else {
      this.isInvalid = true;
    }
  }
}
