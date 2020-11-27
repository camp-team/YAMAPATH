import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostCardComponent } from './post-card/post-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [GoogleMapComponent, PostCardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    GoogleMapsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports: [GoogleMapComponent, PostCardComponent],
})
export class SharedModule {}
