import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainShellRoutingModule } from './main-shell-routing.module';
import { MainShellComponent } from './main-shell/main-shell.component';
import { HeaderComponent } from './header/header.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LegalComponent } from './legal/legal.component';
import { TermsComponent } from './terms/terms.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    MainShellComponent,
    HeaderComponent,
    ToolbarComponent,
    LegalComponent,
    TermsComponent,
  ],
  imports: [
    CommonModule,
    MainShellRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class MainShellModule {}
