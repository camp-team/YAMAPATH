import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainShellRoutingModule } from './main-shell-routing.module';
import { MainShellComponent } from './main-shell/main-shell.component';
import { HeaderComponent } from './header/header.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MainShellComponent, HeaderComponent, ToolbarComponent],
  imports: [
    CommonModule,
    MainShellRoutingModule,
    MatIconModule,
  ]
})
export class MainShellModule { }
