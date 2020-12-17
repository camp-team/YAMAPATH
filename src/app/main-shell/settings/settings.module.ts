import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CropperModule } from '@deer-inc/ngx-croppie';
import { DeleteComponent } from './delete/delete.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileComponent,
    DeleteComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    CropperModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SettingsModule {}
