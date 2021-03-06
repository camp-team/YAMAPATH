import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isProcessing: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }
}
