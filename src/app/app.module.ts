import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatphonePipe } from './cors/pipes/formatphone.pipe';
import { DetailsViewComponent } from './details-view/details-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgOptimizedImage,
    FormatphonePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
