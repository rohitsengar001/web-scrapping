import { ScrappingRecord } from './../cors/interfaces/scrapping-record';
import { Component } from '@angular/core';
import { ScreenSize, UtilService } from '../services/util.service';
import { ActivatedRoute } from '@angular/router';
import { ScrappingService } from '../services/scrapping.service';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss'],
})
export class DetailsViewComponent {
  screenSize: ScreenSize;
  isLoading = false
  data!: ScrappingRecord;
  img: any
  constructor(
    private _util: UtilService,
    private activatedRoute: ActivatedRoute,
    private scrappingService: ScrappingService
  ) {
    this.screenSize = this._util.getFormOrientation();
    window.addEventListener('resize', () => {
      this.screenSize = this._util.getFormOrientation();
    });
  }

  ngOnInit() {
    this.isLoading = true
    this.activatedRoute.data.subscribe(({ record }) => {
      console.log(record);
      this.data = record;
      this.scrappingService.getScreenshot(this.data.url).subscribe(blob => {
        const reader = new FileReader()
        reader.onload = () => {
          this.img = reader.result
        }
        this.isLoading = false
        reader.readAsDataURL(blob)
      })
    });
  }
  displayName(name: string) {
    return name?.split(/[-\s]+/)[0];
  }
}
