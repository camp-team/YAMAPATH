import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ],
})
export class SearchModule {}
