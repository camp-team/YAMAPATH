import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isProcessing: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  googleLogin(): void {
    this.isProcessing = true;
    this.authService.googleLogin().finally(() => (this.isProcessing = false));
  }

  twitterLogin(): void {
    this.isProcessing = true;
    this.authService.twitterLogin().finally(() => (this.isProcessing = false));
  }
}
