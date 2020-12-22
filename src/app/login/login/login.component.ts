import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isProcessing: boolean;
  private subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  googleLogin(): void {
    this.isProcessing = true;
    this.authService.googleLogin().finally(() => (this.isProcessing = false));
  }

  twitterLogin(): void {
    this.isProcessing = true;
    this.authService.twitterLogin().finally(() => (this.isProcessing = false));
  }
}
