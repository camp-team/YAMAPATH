import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [GoogleMapComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    GoogleMapsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    GoogleMapComponent
  ]
})
export class SharedModule { }
