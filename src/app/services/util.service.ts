import { Injectable } from '@angular/core';
export type ScreenSize = 'mobile' | 'tablet' | 'laptop' | 'desktop';
@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}
  getFormOrientation(): ScreenSize {
    const width = window.innerWidth;
    let orientation: ScreenSize = 'mobile';
    if (width <= 576) {
      orientation = 'mobile';
    } else if (width <= 768) {
      orientation = 'tablet';
    } else if (width <= 992 || width >= 1200) {
      orientation = 'laptop';
    } else  {
      orientation = 'desktop';
    }
    return orientation;
  }
}
